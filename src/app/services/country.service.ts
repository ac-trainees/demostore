import { HttpHeaders } from '@angular/common/http';
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

  sendHeader(): HttpHeaders {
    return new HttpHeaders({ country: this.country });
  }
}
