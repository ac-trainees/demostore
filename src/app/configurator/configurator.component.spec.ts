import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfiguratorComponent} from './configurator.component';
import {ActivatedRoute} from "@angular/router";

describe('ConfiguratorComponent', () => {
  let component: ConfiguratorComponent;
  let fixture: ComponentFixture<ConfiguratorComponent>;

  const mockedActivatedRoute: any = {snapshot: {paramMap: {get: jest.fn()}}};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

