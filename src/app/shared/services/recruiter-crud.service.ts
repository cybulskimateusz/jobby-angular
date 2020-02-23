import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { EmployerCrudService } from '../services/employer-crud.service';
import { Recruiter } from '../models/recruiter.model';



@Injectable({
  providedIn: 'root'
})
export class RecruiterCrudService {

  recruiters: any;
  recruitersInEmployer = this.employerCrudService.employerData.collection('recruiters');
  private recruitersCollection = this.afs.collection('recruiters');

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService,
    public employerCrudService: EmployerCrudService
  ) {
    this.recruiters = this.readRecruiters();
  }

  private readRecruiters() {
    return this.recruitersInEmployer.get();
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
    return this.recruitersInEmployer.add(recruiterID);
  }

  readMyRecruiters() {
    return this.afs.collection('recruiters', ref => ref.where('companyID', '==', this.authService.userData.uid)).get();
  }

  getMyRecruiterProfiles() {
    return this.afs.collection('recruiters', ref => ref.where('mail', '==', this.authService.userData.email));
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

  private recruiterID(mail: string) {
    const uid = this.authService.userData.uid;
    return uid + '_' + mail;
  }
}
