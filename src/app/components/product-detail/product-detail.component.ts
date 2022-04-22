import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ProductService } from '../../api/product.service';
import { IDetailedProduct } from '../../Interface/detailedproduct';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfiguratorComponent } from '../../configurator/configurator.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number | undefined;

  product!: IDetailedProduct | undefined;

  destroy$ = new ReplaySubject<void>(1);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productService: ProductService,
    public dialog: MatDialog
  ) { }

  openConfig(param: string): void {
    const dialogRef = this.dialog.open(ConfiguratorComponent, {
      disableClose: true,
      width: '70%',
      data: {
        id: this.productId,
        product: this.product,
        config: param
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl(`product/${this.productId}`);
    });
  }

  getButtonText(param: string): string {
    switch (param) {
      case 'prepaid':
        return 'Pay in Advance';
      case 'postpaid':
        return 'Pay what you used';
      case 'monthly':
        return 'Monthly rate';
      case 'trial':
        return 'Free trial';
      case 'free':
        return 'Free licence';
      default:
        return '';
    }
  }

  getProductDetailsById(): void {
    this.productService
      .getProductDetails(this.route.snapshot.paramMap.get('id') || '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.product = data;
          this.productId = data?.id;
        },
      });
  }

  ngOnInit(): void {
    this.getProductDetailsById();
  }

  ngOnDestroy(): void {
    this.productService.setProductSubject(undefined);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
