import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../api/products.service';
import { IProduct } from '../Interface/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number = 0;

  products: IProduct[] = [];

  sub!: Subscription;

  selectedProduct: IProduct | undefined;

  constructor(private route: ActivatedRoute,
    public productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.productId = id;

    this.sub = this.productService.productData$.subscribe(
      data => {
        if (data.length === 0) {
          this.productService.getProducts().subscribe({
            next: data => {
              this.products = data;
              this.selectedProduct = this.products.find(el => el.id === id);
            }
          })
        } else {
          this.products = data;
          this.selectedProduct = this.products.find(el => el.id === id);
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
