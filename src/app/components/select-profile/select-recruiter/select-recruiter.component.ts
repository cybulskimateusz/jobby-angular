import { Component, OnInit } from '@angular/core';

import { RecruiterCrudService } from '../../../shared/services/recruiter-crud.service';
import { SelectJobComponent } from './select-job/select-job.component';

@Component({
  selector: 'app-select-recruiter',
  templateUrl: './select-recruiter.component.html',
  styleUrls: ['./select-recruiter.component.scss']
})
export class SelectRecruiterComponent implements OnInit {

  recruiters: any;

  constructor(
    public recruiterCrudService: RecruiterCrudService
  ) { }

  ngOnInit(): void {
  }

  async getRecruiters() {
    const recruiters = await this.recruiterCrudService.getMyRecruiterProfiles();
    this.recruiters = recruiters;
  }
}
