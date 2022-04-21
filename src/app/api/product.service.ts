import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { IDetailedProduct } from '../Interface/detailedproduct';
import { CountryService } from '../services/country.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product!: IDetailedProduct | undefined;

  private productUrl = 'https://ac-trainee-store-api.herokuapp.com/products/';

  private productSubject: BehaviorSubject<IDetailedProduct | undefined> =
    new BehaviorSubject(this.product);

  product$: Observable<IDetailedProduct | undefined> =
    this.productSubject.asObservable();

  setProductSubject(newValue: IDetailedProduct | undefined) {
    this.productSubject.next(newValue);
  }

  constructor(private http: HttpClient, private country: CountryService) {}

  getProductDetails(
    productId: string
  ): Observable<IDetailedProduct | undefined> {
    this.http
      .get<IDetailedProduct>(this.productUrl + productId, {
        headers: this.country.getHttpHeaders(),
      })
      .pipe(catchError(this.handleError))
      .subscribe((data) => this.setProductSubject(data));
    return this.product$;
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
