import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QueryService } from '../api/query.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterService } from '../services/filter.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {

  constructor(private router: Router,
    private queryData: QueryService,
    private filterService: FilterService) { }

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
  }
}
