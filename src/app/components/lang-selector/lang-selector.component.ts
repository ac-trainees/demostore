import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent implements OnInit {
  lang!: string;

  allLanguages: { short: string; long: string }[] = [
    { short: 'EN', long: 'English' },
    { short: 'DE', long: 'German' },
  ];

  constructor(public langService: LanguageService) {}

  ngOnInit(): void {
    this.lang = this.langService.language;
  }

  setLang(shortLang: string): void {
    this.lang = shortLang;
    this.langService.setService(shortLang);
  }
}
