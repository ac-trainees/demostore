import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../api/query.service';
import { FilterService } from '../services/filter.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fade', [
      state('show', style({ transform: 'translateY(0%)', opacity: 1 })),
      state('hide', style({ transform: 'translateY(+10%)', opacity: 0 })),
      transition('show => hide', [animate('0ms')]),
      transition('hide => show', [animate('150ms')]),
    ]),
  ],
})

export class HeaderComponent {

  constructor(private router: Router,
    private queryData: QueryService,
    private filterService: FilterService) { }

  isHidden: boolean = false;
  currentColor: string = 'primary';
  mainColor: string = 'primary';
  offColor: string = 'white';

  private _searchDetails: string = '';

  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
  }

  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
    this.queryData.setQueryData(this._searchDetails);
    this.filterService.resetCategoryData();
    this.filterService.resetStatusData();
    this.filterService.resetReleaseDateData();
    this.router.navigate(['search', this._searchDetails]);
    this.toggleSearch();
  }

  toggleSearch(): void {
    this._searchDetails = '';
    this.isHidden = !this.isHidden;
    this.currentColor = this.isHidden ? this.offColor : this.mainColor;
  }
}
