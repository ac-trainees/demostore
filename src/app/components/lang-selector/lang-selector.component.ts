import { LanguageService } from '../../services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent implements OnInit {
  country!: string;
  seachValue!: string;

  allCountrys: { short: string; long: string }[] = [
    { short: 'en', long: 'United States' },
    { short: 'de', long: 'Germany' },
  ];

  filteredCountrys!: { short: string; long: string }[];

  constructor(public langService: LanguageService) {}

  ngOnInit(): void {
    this.country = this.langService.language;
    this.filteredCountrys = this.allCountrys;
  }

  filterCountrys() {
    this.filteredCountrys = this.allCountrys.filter((element) => {
      return element.long.includes(this.seachValue);
    });
  }

  setLang(shortCountry: string): void {
    this.country = shortCountry;
    this.langService.setService(shortCountry);
  }
}
