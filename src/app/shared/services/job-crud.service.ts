import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { Job } from '../models/job.model';
import { Occupation } from '../models/occupation.model';

@Injectable({
  providedIn: 'root'
})
export class JobCrudService {

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService
  ) { }

  createJob(job: Job) {
    return this.afs.collection('jobs').add({ job });
  }

  readJobsByRecruiterID() {
    const recruiterJSON = JSON.parse(sessionStorage.getItem('recruiter'));
    return this.afs.collection('jobs', ref => ref.where('recruiterID', '==', recruiterJSON.recruiterID));
  }

  readJobsByOccupation(occupation: Occupation) {
    return this.afs.collection('jobs', ref => ref.where('occupation', '==', occupation));
  }

  readJobsByCompanyID(companyID: string) {
    return this.afs.collection('jobs', ref => ref.where('companyID', '==', companyID));
  }

  readJobsBySalary(min: number, max: number) {
    return this.afs.collection('jobs', ref => ref.where('salary', '>=', min).where('salary', '<=', max));
  }

  deleteJob(id: string) {
    return this.afs.collection('jobs').doc(id).delete();
  }

}
