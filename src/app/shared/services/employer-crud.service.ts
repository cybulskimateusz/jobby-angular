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
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
  }

  async readEmployer() {
    return this.readEmployerByID(this.authService.getUserData.uid);
  }

  async readEmployerByID(id: string) {
    const promise = await this.employersCollection.doc(id).get().toPromise();

    const employer: Employer = {
      name: promise.data().name,
      contacts: promise.data().contacts,
      projects: promise.data().projects
    };

    return employer;
  }
  createEmployer(employer: Employer) {
    return this.employersCollection.doc(this.authService.getUserData.uid).set(employer);
  }

  deleteEmployer() {
    return this.employersCollection.doc(this.authService.getUserData.uid).delete();
  }

}
