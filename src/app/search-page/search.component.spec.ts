import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  const mockedActivatedRoute: any = {snapshot: {paramMap: {get: jest.fn()}}};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSliderModule,
        MatCardModule,
        MatPaginatorModule,
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule
      ],
      declarations: [SearchComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockedActivatedRoute},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
