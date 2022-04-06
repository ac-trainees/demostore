import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let language!: string;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);

    language = 'not right';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set local lang AND LangService', () => {
    service.setService('de');
    expect(service.language).toBe('de');
  });
});
