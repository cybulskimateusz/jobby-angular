import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  async sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-mail']);
      });
  }

  forgotPassword(passwordResetEmail: any) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = this.getUserData;
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  get getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  facebookAuth() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  authLogin(provider: auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ user.uid }`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

}
