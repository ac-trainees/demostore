import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IProduct } from "src/app/Interface/products";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})

export class SearchResultComponent {

  @Input() visibleProducts: IProduct[] = [];

  breakPoint!: number;

  constructor(private router: Router) {}

  toProductDetailPage(id: number): void {
    this.router.navigate(["product", id]);
  }
}
