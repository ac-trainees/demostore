import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  country: string = 'us';
  constructor() {}

  setCountryCode(country: string) {
    this.country = country;
  }

  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({ country: this.country });
  }
}
