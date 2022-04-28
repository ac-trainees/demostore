import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
        ReactiveFormsModule
      ],
      declarations: [ConfiguratorComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockedActivatedRoute},
        {
          provide: MatDialogRef,
          useValue: []
           },
          {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive a value', () => {
    expect(component.country).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.configuratorForm.valid).toBeFalsy();
  });

  it('date field should initially be invalid', () => {
    let date = component.configuratorForm.controls['date'];
    expect(date.valid).toBeFalsy();
  });

  it('duration field should initially be invalid', () => {
    let duration = component.configuratorForm.controls['duration'];
    expect(duration.valid).toBeFalsy();
  });

  it('date field validity', () => {
    let errors;
    let date = component.configuratorForm.controls['date'];
    errors = date.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('form is valid when requiered fields are filled out', () => {
    expect(component.configuratorForm.valid).toBeFalsy();
    component.configuratorForm.controls['date'].setValue("2022-04-27T22:00:00.000Z");
    component.configuratorForm.controls['duration'].setValue(6);
    expect(component.configuratorForm.valid).toBeTruthy();
  });
});
