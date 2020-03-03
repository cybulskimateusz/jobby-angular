import { Component, OnInit, Input } from '@angular/core';

import { JobCrudService } from '../../../../shared/services/job-crud.service';
import { SelectProfileService } from '../../../../shared/services/select-profile.service';

@Component({
  selector: 'app-select-job',
  templateUrl: './select-job.component.html',
  styleUrls: ['./select-job.component.scss']
})
export class SelectJobComponent implements OnInit {

  @Input() recruiterID: string;
  @Input() recruiterCompany: string;
  jobs: any;

  constructor(
    public jobCrudService: JobCrudService,
    public selectProfileService: SelectProfileService
  ) { }

  ngOnInit(): void {
  }

  async getJobs() {
    const jobs = await this.jobCrudService.readJobsByRecruiterID(this.recruiterID);
    this.jobs = jobs;
  }

  removeJob(id: string) {
    this.jobCrudService.deleteJob(id);
    this.jobs = this.jobs.filter(job => job.id !== id)
  }
}
