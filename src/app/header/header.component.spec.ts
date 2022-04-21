import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { CountrySelectorComponent } from '../components/country-selector/country-selector.component';
import { MockComponents } from 'ng-mocks';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../api/product.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router = {
    navigate: jest.fn(),
  };
  let productService = {
    product$: of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, BrowserAnimationsModule, FormsModule],
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
        { provide: ProductService, useValue: productService },
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

  it('should sub to one Product if way  1', () => {
    productService.product$ = of({});
    component.subToproduct();
    expect(component.currentLocalItem).toEqual({});
  });

  it('should sub to one Product if way 2', () => {
    productService.product$ = of(undefined as any);
    component.subToproduct();
    expect(component.currentLocalItem).toEqual(undefined);
  });
});
