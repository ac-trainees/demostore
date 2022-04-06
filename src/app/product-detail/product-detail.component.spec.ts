import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductDetailComponent} from './product-detail.component';
import {ActivatedRoute} from "@angular/router";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";

const mockedActivatedRoute: any = {snapshot: {paramMap: {get: jest.fn()}}};

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [ProductDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockedActivatedRoute},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

