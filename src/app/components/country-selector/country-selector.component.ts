import { CountryService } from '../../services/country.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryI } from '../../interfaces/country';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
})
export class CountrySelectorComponent implements OnInit {


  country!: string;
  seachValue!: string;
  menuOpen: boolean = false;

  allCountrys: CountryI[] = [
    { alpha2Code: 'en', name: 'United States' },
    { alpha2Code: 'de', name: 'Germany' },
  ];

  filteredCountrys!: CountryI[];

  constructor(public countryService: CountryService) {}

  ngOnInit(): void {
    this.country = this.countryService.country;
    this.filteredCountrys = this.allCountrys;
  }

  filterCountrys() {
    this.filteredCountrys = this.allCountrys.filter((element) => {
      return element.name.includes(this.seachValue);
    });
  }

  setCountry(shortCountry: string): void {
    this.country = shortCountry;
    this.countryService.setService(shortCountry);
  }
}
