import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountryService } from '../../services/country.service';
import { CountrySelectorComponent } from './country-selector.component';

describe('CountrySelectorComponent', () => {
  let component: CountrySelectorComponent;
  let fixture: ComponentFixture<CountrySelectorComponent>;

  let countryServiceStub = {
    country: 'error',
    setService: jest.fn((country: string) => {
      countryServiceStub.country = country;
    }),
  };

  let eventStub: any = { stopPropagation: jest.fn((event: Event) => {}) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrySelectorComponent],
      imports: [
        MatMenuModule,
        MatButtonModule,
        MatListModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: CountryService, useValue: countryServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should set local country AND countryService', () => {
    component.setCountry('de');

    expect(component.country).toBe('de');
    expect(countryServiceStub.country).toBe('de');
  });

  it('should filter the list of countries', () => {
    component.seachValue = 'G';
    component.filterCountrys();
    expect(component.filteredCountrys).toContainEqual({
      alpha2Code: 'de',
      name: 'Germany',
    });
  });

  it('should filter the list of countries', () => {
    component.seachValue = 'U';
    component.filterCountrys();
    expect(component.filteredCountrys).toContainEqual({
      alpha2Code: 'us',
      name: 'United States',
    });
  });

  it('should be called', () => {
    component.stopPropagation(eventStub);
    expect(eventStub.stopPropagation.mock.calls.length).toBe(1);
  });

  it('should reset filter ad run filter', () => {
    component.resetFilter();
    expect(component.seachValue).toBe('');
    expect(component.allCountrys).toHaveLength(2);
  });
});
