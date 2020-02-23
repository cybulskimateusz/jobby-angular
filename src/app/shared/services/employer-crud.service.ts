import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { Employer } from '../models/employer.model';


@Injectable({
  providedIn: 'root'
})
export class EmployerCrudService {

  employerData: any;
  private employersCollection = this.afs.collection('employers');

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService
  ) {
    if (this.readEmployer()) {
      this.employerData = this.readEmployer();
    } else {
      this.createEmployer();
    }
  }

  private createEmployer() {
    return this.employersCollection.add(this.authService.userData.uid);
  }

  private readEmployer() {
    return this.employersCollection.doc(this.authService.userData.uid).get();
  }

  updateEmployer(employer: Employer) {
    return this.employersCollection.doc(this.authService.userData.uid).set(employer);
  }

  deleteEmployer() {
    return this.employersCollection.doc(this.authService.userData.uid).delete();
  }

}
