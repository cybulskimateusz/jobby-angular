import { Component, OnInit, Input } from '@angular/core';

import { JobCrudService } from '../../../../shared/services/job-crud.service';
import { SelectProfileService } from '../../../../shared/services/select-profile.service';
import { CreateJobComponent } from './create-job/create-job.component';
import { EmployerCrudService } from 'src/app/shared/services/employer-crud.service';

@Component({
  selector: 'app-select-job',
  templateUrl: './select-job.component.html',
  styleUrls: ['./select-job.component.scss']
})
export class SelectJobComponent implements OnInit {

  @Input() recruiterID: string;
  @Input() employerID: string;

  jobs: any;
  employerName: string;

  constructor(
    public jobCrudService: JobCrudService,
    public selectProfileService: SelectProfileService,
    public employerCrudService: EmployerCrudService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const employer = await this.employerCrudService.readEmployerByID(this.employerID);
    this.employerName = employer.name;
  }

  async removeJob(id: string) {
    await this.jobCrudService.deleteJob(id);
    this.getJobs();
  }

  async getJobs() {
    const jobs = await this.jobCrudService.readJobsByRecruiterID(this.recruiterID);
    this.jobs = jobs;
  }
}
