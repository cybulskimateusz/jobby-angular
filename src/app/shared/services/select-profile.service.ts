import { Injectable } from '@angular/core';

import { RecruiterCrudService } from './recruiter-crud.service';
import { JobCrudService } from './job-crud.service';
import { EmployeeCrudService } from './employee-crud.service';
import { EmployerCrudService } from './employer-crud.service';



@Injectable({
  providedIn: 'root'
})
export class SelectProfileService {

  isSelected = false;

  constructor(
    public recruiterCrudService: RecruiterCrudService,
    public jobCrudService: JobCrudService,
    public employerCrudService: EmployerCrudService,
    public employeeCrudService: EmployeeCrudService
  ) { }

  selectEmployee() {
    const employee = this.employeeCrudService.readEmployee().get();
    sessionStorage.setItem('employee', JSON.stringify(employee));
    this.isSelected = true;
  }

  unselectEmployee() {
    sessionStorage.removeItem('employee');
    this.isSelected = false;
  }

  selectEmployer() {
    const employer = this.employerCrudService.employerData;
    sessionStorage.setItem('employer', JSON.stringify(employer));
    this.isSelected = true;
  }

  unselectEmployer() {
    sessionStorage.removeItem('employer');
    this.isSelected = false;
  }

  selectJob(id: string) {
    const job = this.jobCrudService.readJobsByRecruiterID().doc(id);
    sessionStorage.setItem('job', JSON.stringify(job));
    this.isSelected = true;
  }

  unselectJob() {
    sessionStorage.removeItem('job');
    this.isSelected = false;
  }

  selectRecruiter(id: string) {
    const recruiter = this.recruiterCrudService.getMyRecruiterProfiles().doc(id);
    sessionStorage.setItem('recruiter', JSON.stringify(recruiter));
    this.isSelected = true;
  }

  unselectRecruiter() {
    sessionStorage.removeItem('recruiter');
    this.isSelected = false;
  }
}
