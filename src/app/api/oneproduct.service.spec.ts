import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { CountryService } from '../services/country.service';
import { OneProductService } from './oneproduct.service';

const mockedHttpClient: any = {
  get: jest.fn().mockReturnValue(of({})),
};

const mockedCountryService: any = {
  getHttpHeaders: jest.fn(),
};

describe('OneProductService', () => {
  let service: OneProductService;
  console.error = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [
        { provide: HttpClient, useValue: mockedHttpClient },
        { provide: CountryService, useValue: mockedCountryService },
      ],
    });
    service = TestBed.inject(OneProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty Object', (done) => {
    service.getSingleProductDetails('sad');

    service.oneProduct$.subscribe((data) => {
      expect(data).toEqual({});
      done();
    });
  });

  it('should return Server error messasge ', () => {
    let err: HttpErrorResponse = {
      status: 401,
      message: 'ERROR',
    } as HttpErrorResponse;
    service['handleError'](err);
    expect(console.error).toHaveBeenCalledWith(
      'Server returned code 401, error message is: ERROR'
    );
  });

  it('should return error messasge ', () => {
    let err: HttpErrorResponse = {
      status: 401,
      message: 'ERROR',
      error: new ErrorEvent('error', undefined),
    } as HttpErrorResponse;
    service['handleError'](err);

    expect(console.error).toHaveBeenCalledWith('An error occured ');
  });
});
