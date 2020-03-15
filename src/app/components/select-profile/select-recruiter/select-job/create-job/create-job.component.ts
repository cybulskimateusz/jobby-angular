import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Job } from '../../../../../shared/models/job';
import { Occupation } from 'src/app/shared/models/occupation.enum';
import { EmployerCrudService } from 'src/app/shared/services/employer-crud.service';
import { JobCrudService } from 'src/app/shared/services/job-crud.service';
import { Address } from 'src/app/shared/models/address';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  @Input() recruiterID: string;
  @Input() employerID: string;

  private Occupation = Occupation;
  isOpen = false;
  occupationOptions: string[];
  selectedOccupation: Occupation;
  createJobForm: FormGroup;
  address: Address;

  constructor(
    private employerCrudService: EmployerCrudService,
    private formBuilder: FormBuilder,
    private jobCrudService: JobCrudService
  ) {
  }

  ngOnInit(): void {
    this.createJobForm = this.formBuilder.group({
      occupation: [Occupation[''], Validators.required],
      salary: ['', [Validators.min(0), Validators.required]],
      description: ['', Validators.required],
      recruiterID: [this.recruiterID],
      employerID: [this.employerID],
      location: [{}],
      abilities: [''],
      languages: ['']
    });

    this.occupationOptions = Object.keys(this.Occupation);
  }

  setLocationField(value: string) {
    this.setFormField('location', JSON.parse(value));
  }

  setFormField(field: string, value: any) {
    this.createJobForm.controls[field].setValue(value);
  }

  createJob() {
    this.jobCrudService.createJob(this.createJobForm.value);
    console.log(this.createJobForm.value)
  }
  setOccupationIfExist(key: string) {
    if (!Object.keys(this.Occupation).includes(key)) {
      this.throwNewOccupationError(key);
    } else {
      this.setOccupation(key);
    }
  }

  private setOccupation(key: string) {
    this.selectedOccupation = this.Occupation[key];
  }

  private throwNewOccupationError(key: string) {
    throw new Error(`"${ key }" is not an occupation`);
  }
}
