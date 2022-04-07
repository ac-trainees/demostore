import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountrySelectorComponent } from '../components/country-selector/country-selector.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  private _searchDetails: string = '';

  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
  }

  onSearch(): void {
    this.router.navigate(['search', this._searchDetails]);
  }
}
