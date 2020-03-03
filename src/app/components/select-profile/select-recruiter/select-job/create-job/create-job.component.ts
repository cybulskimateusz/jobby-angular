import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  @Input() recruiterID: string;

  constructor() { }

  ngOnInit(): void {
  }

}
