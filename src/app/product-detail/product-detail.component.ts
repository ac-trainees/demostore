import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../api/products.service';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { IProduct } from '../Interface/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  configurator: string = 'monthly';

  productId: number = 0;

  products: IProduct[] = [];

  private readonly destroy$ = new Subject<void>();

  selectedProduct: IProduct | undefined;

    constructor( public dialog: MatDialog,
      public productService: ProductService,
      private route: ActivatedRoute,
      private router: Router) {

        route.queryParams
        .subscribe(params => {
          if (params['configurator']) {
            this.openDialog();
          }
        });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfiguratorComponent, {
      width: '70%',
      data: {
        id: this.productId,
        product: this.selectedProduct,
        config: this.configurator
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl(`product/${this.productId}`);
    });
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.productId = id;

    this.productService.productData$
    .pipe(takeUntil(this.destroy$))
    .subscribe(
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}

const findProductById = (array: IProduct[], id: number) => {
  return array.find(el => el.id === id)
}
