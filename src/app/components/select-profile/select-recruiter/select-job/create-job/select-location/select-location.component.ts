import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { environment } from '../../../../../../../environments/environment';
import { Address } from '../../../../../../shared/models/address';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss']
})
export class SelectLocationComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

  accessToken: string;
  placesFound: Address[];

  constructor() {
    this.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
  }

  setAddress(address: Address) {
    this.valueChange.emit(JSON.stringify(address));
  }

  async setfiltredPlaces(e) {
    if (e.target.value) {
      const json = await this.getListOfPlaces(e);
      const places = json.features.map(el => this.formatLocationData(el));
      this.placesFound = places.filter(el => el.number)
    }
  }

  private async getListOfPlaces(e) {
    const unicodePlace = encodeURI(e.target.value);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ unicodePlace }.json?access_token=${ this.accessToken }`
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  formatLocationData(data: any): Address {
    const address: any = {};

    if (data.context) {
      address.place_name = data.place_name;
      address.name = data.text;
      address.number = data.address;
      data.context.forEach(element => {
        if (element.id.indexOf('locality') >= 0) { address.locality = element.text; }
        if (element.id.indexOf('postcode') >= 0) { address.postcode = element.text; }
        if (element.id.indexOf('place') >= 0) { address.place = element.text; }
        if (element.id.indexOf('region') >= 0) { address.region = element.text; }
        if (element.id.indexOf('country') >= 0) { address.country = element.text; }
        if (element.id.indexOf('neighbourhood') >= 0) { address.neighbourhood = element.text; }
        if (element.id.indexOf('district') >= 0) { address.district = element.text; }
      });
      address.center = data.center;
    }

    return address;
  }


}
