import { TestBed } from '@angular/core/testing';

import { CountryService } from './country.service';

describe('LanguageService', () => {
  let service: CountryService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryService);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set local lang AND LangService', () => {
    service.setService('de');
    expect(service.country).toBe('de');
  });
});
