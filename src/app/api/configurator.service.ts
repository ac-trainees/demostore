import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class ConfiguratorService {

  //private productUrl = 'https://ac-trainee-store-api.herokuapp.com/products';
  private exampleUrl = 'https://jsonplaceholder.typicode.com/posts'

  constructor(private http: HttpClient) {}

  addToCart(data:any): Observable<any> {
      const body = data;

      return this.http.post<any>(this.exampleUrl, body)
  }
}
