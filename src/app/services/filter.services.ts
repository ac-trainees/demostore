import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  public categorySubject: BehaviorSubject<string> = new BehaviorSubject('');
  categoryData$: Observable<string> = this.categorySubject.asObservable();

  public statusSubject: BehaviorSubject<string> = new BehaviorSubject('');
  statusData$: Observable<string> = this.statusSubject.asObservable();

  public releaseDateSubject: BehaviorSubject<string> = new BehaviorSubject('');
  releaseDateData$: Observable<string> = this.releaseDateSubject.asObservable();

  constructor() { }

  setCategoryData(newValue: string) {
    this.categorySubject.next(newValue)
  }
  resetCategoryData() {
    this.categorySubject.next('');
  }
  setStatusData(newValue: string) {
    this.statusSubject.next(newValue)
  }
  resetStatusData() {
    this.statusSubject.next('');
  }
  setReleaseDateData(newValue: string) {
    this.releaseDateSubject.next(newValue)
  }
  resetReleaseDateData() {
    this.releaseDateSubject.next('');
  }
}
