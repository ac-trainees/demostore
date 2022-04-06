import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  country: string = 'en';

  constructor() {}

  setService(country: string) {
    this.country = country;
  }
}
