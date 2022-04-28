import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class QueryService {

  public querySubject: BehaviorSubject<string> = new BehaviorSubject('');
  queryData$: Observable<string> = this.querySubject.asObservable();

  constructor() { }

  setQueryData(newValue: string) {
    this.querySubject.next(newValue)
  }
}
