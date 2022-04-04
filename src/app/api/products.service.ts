import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, tap, throwError } from "rxjs";
import { IProduct } from "../Interface/products";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    products: IProduct[] = [];

    private productUrl = 'https://ac-trainee-store-api.herokuapp.com/products';

    public productsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject(this.products);
    productData$: Observable<IProduct[]> = this.productsSubject.asObservable();


    setProductsSubject(newValue: IProduct[]) {
        this.productsSubject.next(newValue)
    }

    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
          .pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            tap(data => this.setProductsSubject(data)),
            catchError(this.handleError)
          );
      }

    private handleError(err: HttpErrorResponse): Observable<never>{
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occured ${err.error.message}`
        } else {
            errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`
        }

        console.error(errorMessage);
        return throwError(errorMessage)
    }
}