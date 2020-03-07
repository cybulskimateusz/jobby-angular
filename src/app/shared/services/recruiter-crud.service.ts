import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { EmployerCrudService } from '../services/employer-crud.service';
import { Recruiter } from '../models/recruiter.model';



@Injectable({
  providedIn: 'root'
})
export class RecruiterCrudService {

  private recruitersInEmployer = this.employerCrudService.employerReference.collection('recruiters');
  private recruitersCollection = this.afs.collection('recruiters');

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private employerCrudService: EmployerCrudService
  ) {
  }

  private readRecruiters() {
    return this.recruitersInEmployer.get();
  }

  readRecruiterById(id: string) {
    return this.recruitersCollection.doc(id).get().toPromise().then(res => res.data())
  }

  createRecruiter(mail: string) {
    this.createRecruiterInRecruitersCollection(mail);
    this.createRecruiterInEmployer(mail);
  }

  private createRecruiterInRecruitersCollection(mail: string) {
    const recruiterID = this.recruiterID(mail);
    return this.recruitersCollection.add(recruiterID);
  }

  private createRecruiterInEmployer(mail: string) {
    const recruiterID = this.recruiterID(mail);
    return this.employerCrudService.employerReference.collection('recruiters').doc(recruiterID).set({});
  }

  readMyRecruiters() {
    return this.afs.collection('recruiters', ref => ref.where('companyID', '==', this.authService.getUserData.uid)).get();
  }

  async getMyRecruiterProfiles() {
    const filtredCollection = this.afs.collection('recruiters', ref => ref.where('mail', '==', this.authService.getUserData.email))
    const docsPromise = await filtredCollection.get().toPromise();
    const myRecruiters = docsPromise.docs.map(el => {
      const company = {
        id: el.id,
        employerID: el.data().employerID
      };
      return company;
    });
    return myRecruiters;
  }

  updateRecruiter(recruiter: Recruiter) {
    const recruiterID = this.recruiterID(recruiter.mail);
    return this.recruitersCollection.doc(recruiterID).set(recruiter);
  }

  deleteRecruiter(mail: string) {
    this.deleteRecruiterInRecruitersCollection(mail);
    this.deleteRecruiterInEmployer(mail);
  }

  private deleteRecruiterInRecruitersCollection(mail: string) {
    const recruiterID = this.recruiterID(mail);
    return this.recruitersCollection.doc(recruiterID).delete();
  }

  private deleteRecruiterInEmployer(mail: string) {
    const recruiterID = this.recruiterID(mail);
    return this.recruitersInEmployer.doc(recruiterID).delete();
  }

  private recruiterID(mail: string): string {
    const uid = this.authService.getUserData.uid;
    return uid + '_' + mail;
  }
}
