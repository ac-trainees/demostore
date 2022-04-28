import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IProduct } from "src/app/Interface/products";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: [],
})

export class SearchResultComponent {

  @Input() visibleProducts: IProduct[] = [];

  searchWord!: string;

  breakPoint!: number;

  constructor(private router: Router) {}

  toProductDetailPage(id: number): void {
    this.router.navigate(["product", id]);
  }
}
