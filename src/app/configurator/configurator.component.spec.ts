import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ConfiguratorComponent } from './configurator.component';

describe('ConfiguratorComponent', () => {
  let component: ConfiguratorComponent;
  let fixture: ComponentFixture<ConfiguratorComponent>;

  const mockedActivatedRoute: any = {snapshot: {paramMap: {get: jest.fn()}}};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormlyModule
      ],
      declarations: [ConfiguratorComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockedActivatedRoute},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
