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

  async readJobsByRecruiterID(id: string) {
    return this.afs.collection('jobs', ref => ref.where('recruiterID', '==', id))
      .get().toPromise().then(res => res.docs.map(el => {
        let job = {
          id: el.id,
          data: el.data()
        };

        return job;


      }))
  }

  async readJobByID(id: string) {
    const queriedData = await this.afs.collection('jobs').doc(id).get().toPromise();

    return queriedData.data()
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
