import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {}

  showDropdown: boolean = false;

  private _searchDetails: string = '';

  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
    console.log('search: ', this._searchDetails)
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    console.log(this.showDropdown)
  }

  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
  }

  ngOnInit(): void {

  }

}
