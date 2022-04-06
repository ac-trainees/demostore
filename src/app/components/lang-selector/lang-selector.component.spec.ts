import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageService } from '../../services/language.service';
import { LangSelectorComponent } from './lang-selector.component';

describe('LangSelectorComponent', () => {
  let component: LangSelectorComponent;
  let fixture: ComponentFixture<LangSelectorComponent>;
  let lang!: string;
  let langServiceStub = {
    language: 'not right',
    setService: jest.fn((language: string) => {
      langServiceStub.language = language;
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LangSelectorComponent],
      imports: [MatMenuModule, MatButtonModule],
      providers: [{ provide: LanguageService, useValue: langServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    lang = 'not right';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set local lang AND LangService', () => {
    component.setLang('de');
    expect(lang && langServiceStub.language).toBe('de');
  });
});
