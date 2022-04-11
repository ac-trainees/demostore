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
    service.setCountryCode('de');
    expect(service.country).toBe('de');
  });

  it('should return a header ', () => {
    let testValue = service.getHttpHeaders();
    expect(testValue).toBeTruthy();
  });
});
