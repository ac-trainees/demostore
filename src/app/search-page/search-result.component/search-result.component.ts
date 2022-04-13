import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IProduct } from "src/app/Interface/products";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})

export class SearchResultComponent implements OnInit {

  @Input() visibleProducts: IProduct[] = [];

  breakPoint!: number;

  constructor(private router: Router) {}

  onResize(event: any) {
    this.breakPoint = (event.target.innerWidth < 1200) ? 2 : 3;
  }

  toProductDetailPage(id: number): void {
    this.router.navigate(["product", id]);
  }

  ngOnInit(): void {
    this.breakPoint = (window.innerWidth < 1200) ? 2 : 3;
  }
}
