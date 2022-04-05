import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: string = 'en';

  constructor() {}

  setService(language: string) {
    this.language = language;
  }
}
