import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { IOneSingleProduct } from '../Interface/singleproduct';
import { CountryService } from '../services/country.service';

@Injectable({
  providedIn: 'root',
})
export class OneProductService {
  oneProduct!: IOneSingleProduct | undefined;

  private oneProductUrl =
    'https://ac-trainee-store-api.herokuapp.com/products/';

  private oneProductSubject: BehaviorSubject<IOneSingleProduct | undefined> =
    new BehaviorSubject(this.oneProduct);

  oneProduct$: Observable<IOneSingleProduct | undefined> =
    this.oneProductSubject.asObservable();

  setOneProductSubject(newValue: IOneSingleProduct | undefined) {
    this.oneProductSubject.next(newValue);
  }

  constructor(private http: HttpClient, private country: CountryService) {}

  getSingleProductDetails(
    productId: string
  ): Observable<IOneSingleProduct | undefined> {
    this.http
      .get<IOneSingleProduct>(this.oneProductUrl + productId, {
        headers: this.country.getHttpHeaders(),
      })
      .pipe(catchError(this.handleError))
      .subscribe((data) => this.setOneProductSubject(data));
    return this.oneProduct$;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
