import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CountrySelectorComponent } from '../components/country-selector/country-selector.component';
import { MockComponent, MockComponents } from 'ng-mocks';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { OneProductService } from '../api/oneproduct.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router = {
    navigate: jest.fn(),
  };
  let oneProductService = {
    oneProduct$: of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule],
      declarations: [
        HeaderComponent,
        ...MockComponents(
          CountrySelectorComponent,
          MatToolbar,
          MatIcon,
          MatFormField
        ),
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: OneProductService, useValue: oneProductService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch', () => {
    component.onSearch();
    expect(router.navigate).toHaveBeenCalled;
    expect(component.toggleSearch).toHaveBeenCalled;
  });

  it('should toggle Seachbar', () => {
    component.isHidden = true;
    component.currentColor = '';
    component.toggleSearch();
    expect(component.isHidden).toBe(false);
    expect(component.currentColor).toBe(component.mainColor);
  });

  it('should toggle Second switch  Seachbar', () => {
    component.isHidden = false;
    component.currentColor = '';
    component.toggleSearch();
    expect(component.isHidden).toBe(true);
    expect(component.currentColor).toEqual(component.offColor);
  });

  it('should test set and get for private _searchDetails', () => {
    component.searchDetails = 'asdad';
    expect(component.searchDetails).toBe('asdad');
  });

  it('should sub to one Product', () => {
    component.subToOneProduct();
    expect(component.currentLocalItem).toEqual({});
  });

  it('should sub to one Product', () => {
    oneProductService.oneProduct$ = of(undefined as any);
    component.subToOneProduct();
    expect(component.currentLocalItem).toEqual(undefined);
  });
});
