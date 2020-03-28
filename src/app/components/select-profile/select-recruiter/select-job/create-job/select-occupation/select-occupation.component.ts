import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Occupation } from 'src/app/shared/models/occupation.enum';

@Component({
  selector: 'app-select-occupation',
  templateUrl: './select-occupation.component.html',
  styleUrls: ['./select-occupation.component.scss']
})
export class SelectOccupationComponent {

  @Output() valueChange = new EventEmitter();

  private Occupation = Occupation;
  occupationOptions: string[];
  selectedOccupation: Occupation;

  constructor() {
    this.occupationOptions = Object.keys(this.Occupation);
  }

  setOccupationIfExist(key: string) {
    if (!Object.keys(this.Occupation).includes(key)) {
      this.throwNewOccupationError(key);
    } else {
      this.setOccupation(key);
    }
  }

  private setOccupation(key: string) {
    this.valueChange.emit(this.Occupation[key]);
  }

  private throwNewOccupationError(key: string) {
    throw new Error(`"${ key }" is not an occupation`);
  }

}
