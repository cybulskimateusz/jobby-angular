import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { Employer } from '../models/employer.model';


@Injectable({
  providedIn: 'root'
})
export class EmployerCrudService {

  private employersCollection = this.afs.collection('employers');
  employerReference = this.employersCollection.doc(this.authService.getUserData.uid);

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService
  ) {
  }

  async readEmployer() {
    return this.employersCollection.doc(this.authService.getUserData.uid).get().toPromise().then(res => {
      return res.data();
    })

  }

  createEmployer(employer: Employer) {
    return this.employersCollection.doc(this.authService.getUserData.uid).set(employer);
  }

  deleteEmployer() {
    return this.employersCollection.doc(this.authService.getUserData.uid).delete();
  }

}
