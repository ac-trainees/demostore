import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponents } from 'ng-mocks';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';


const mockedActivatedRoute: any = {
  snapshot: { paramMap: { get: jest.fn() } },
};

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let router = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      declarations: [
        ProductDetailComponent,
        ...MockComponents(MatTabGroup, MatTab),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockedActivatedRoute,
        },
        { provide: Router,
          useValue: router
        },
        FormBuilder
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Montly rate', () => {
    expect(component.getButtonText('prepaid')).toBe('Pay in Advance');
    expect(component.getButtonText('postpaid')).toBe('Pay what you used');
    expect(component.getButtonText('monthly')).toBe('Monthly rate');
    expect(component.getButtonText('trial')).toBe('Free trial');
    expect(component.getButtonText('free')).toBe('Free licence');
    expect(component.getButtonText('')).toBe('');
  });
});
