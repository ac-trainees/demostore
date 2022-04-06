import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrySelectorComponent],
      imports: [MatMenuModule, MatButtonModule],
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
    expect(countryServiceStub.country).toBe("de");
  })

  it("should filter the list of countries", () => {
    component.seachValue = "G"
    component.filterCountrys();
    expect(component.filteredCountrys).toContainEqual({long: "Germany",short: "de"});
  })

   it("should filter the list of countries", () => {
    component.seachValue = "U"
    component.filterCountrys();
    expect(component.filteredCountrys).toContainEqual({long: "United States",short: "en"});
  })
});
