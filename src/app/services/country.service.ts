import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  country: string = 'us';

  constructor() {}

  setService(country: string) {
    this.country = country;
  }

  sendHeader() {
    return new Headers({ country: this.country });
  }
}
