import { CountryService } from '../../services/country.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryI } from '../../Interface/country';
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
    { alpha2Code: 'us', name: 'United States' },
    { alpha2Code: 'de', name: 'Germany' },
  ];

  filteredCountrys!: CountryI[];

  constructor(public countryService: CountryService) {}

  @ViewChild('ClickMatMenuTrigger') trigger!: MatMenuTrigger;

  ngOnInit(): void {
    this.country = this.countryService.country;
    this.filteredCountrys = this.allCountrys;
  }

  filterCountrys() {
    this.filteredCountrys = this.allCountrys.filter((element) => {
      return element.name
        .toLocaleLowerCase()
        .includes(this.seachValue.toLocaleLowerCase());
    });
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }

  resetFilter() {
    this.seachValue = '';
    this.filterCountrys();
  }

  setCountry(shortCountry: string): void {
    this.country = shortCountry;
    this.countryService.setService(shortCountry);
    this.trigger.closeMenu();
  }
}
