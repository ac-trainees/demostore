import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isHidden: boolean = false;
  currentColor: string = 'primary';
  mainColor: string = 'primary';
  offColor: string = 'white';
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
    this.toggleSearch();
  }

  toggleSearch(): void {
    this._searchDetails = '';
    this.isHidden = !this.isHidden;
    this.currentColor = this.isHidden ? this.offColor : this.mainColor;
  }
}
