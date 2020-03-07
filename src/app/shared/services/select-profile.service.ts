import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JobCrudService } from './job-crud.service';
import { EmployeeCrudService } from './employee-crud.service';
import { EmployerCrudService } from './employer-crud.service';



@Injectable({
  providedIn: 'root'
})
export class SelectProfileService {

  constructor(
    private jobCrudService: JobCrudService,
    private employerCrudService: EmployerCrudService,
    private employeeCrudService: EmployeeCrudService,
    private router: Router
  ) { }

  selectEmployee() {
    const employee = this.employeeCrudService.readEmployee().get();
    this.selectProfle('employee', employee);
  }

  async selectEmployer() {
    const employer = await this.employerCrudService.readEmployer();
    this.selectProfle('employer', employer);
  }

  async selectJob(id: string) {
    const job = await this.jobCrudService.readJobByID(id);
    this.selectProfle('job', job);
  }

  private selectProfle(profileType: string, json: any) {
    const type = { type: profileType };
    const profile = { ...json, ...type };
    sessionStorage.setItem('profile', JSON.stringify(profile));
    this.router.navigate(['dashboard']);

  }

  unselectProfile() {
    sessionStorage.removeItem('profile');
    this.router.navigate(['select-profile']);
  }

  get getProfile() {
    return sessionStorage.getItem('profile');
  }
}
