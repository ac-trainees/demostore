import { CountryService } from '../../services/country.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
})
export class CountrySelectorComponent implements OnInit {
  country!: string;
  seachValue!: string;

  allCountrys: { short: string; long: string }[] = [
    { short: 'en', long: 'United States' },
    { short: 'de', long: 'Germany' },
  ];

  filteredCountrys!: { short: string; long: string }[];

  constructor(public countryService: CountryService) {}

  ngOnInit(): void {
    this.country = this.countryService.country;
    this.filteredCountrys = this.allCountrys;
  }

  filterCountrys() {
    this.filteredCountrys = this.allCountrys.filter((element) => {
      return element.long.includes(this.seachValue);
    });
  }

  setCountry(shortCountry: string): void {
    this.country = shortCountry;
    this.countryService.setService(shortCountry);
  }
}
