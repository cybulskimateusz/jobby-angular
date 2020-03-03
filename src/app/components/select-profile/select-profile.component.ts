import { Component, OnInit } from '@angular/core';

import { SelectProfileService } from '../../shared/services/select-profile.service';
import { SelectRecruiterComponent } from './select-recruiter/select-recruiter.component';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.scss']
})
export class SelectProfileComponent implements OnInit {

  jobs: any;

  constructor(
    public selectProfileService: SelectProfileService,
  ) { }

  ngOnInit(): void {
  }
}
