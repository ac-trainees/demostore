import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../api/query.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(private router: Router,
              private queryData: QueryService) {}

  private _searchDetails: string = '';

  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
  }

  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
    this.queryData.setQueryData(this._searchDetails)
  }
}
