import { OneProductService } from './../api/oneproduct.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IOneSingleProduct } from '../Interface/singleproduct';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fade', [
      state('show', style({ transform: 'translateY(0%)' })),
      state(
        'hide',
        style({
          transform: 'translateY(+10%)',
          visibility: 'hidden',
        })
      ),
      transition('show => hide', [animate('0ms')]),
      transition('hide => show', [animate('150ms')]),
    ]),
  ],
})

export class HeaderComponent implements OnInit, OnDestroy {
  isHidden: boolean = false;
  currentColor: string = 'primary';
  mainColor: string = 'primary';
  offColor: string = 'white';
  currentLocalItem: IOneSingleProduct | undefined = undefined;

  destroy$ = new ReplaySubject<void>(1);

  constructor(
    private router: Router,
    private oneProductService: OneProductService
  ) {}

  private _searchDetails: string = '';

  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
  }

  onSearch(): void {
    this.router.navigate(['search', this._searchDetails]);
    this.toggleSearch();
  }

  toggleSearch(): void {
    this.searchDetails = '';
    this.isHidden = !this.isHidden;
    this.currentColor = this.isHidden ? this.offColor : this.mainColor;
  }

  subToOneProduct(): void {
    this.oneProductService.oneProduct$
      .pipe(takeUntil(this.destroy$))
      .subscribe((singleProduct) => {
        singleProduct
          ? (this.currentLocalItem = singleProduct)
          : (this.currentLocalItem = undefined);
      });
  }

  ngOnInit(): void {
    this.subToOneProduct();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
