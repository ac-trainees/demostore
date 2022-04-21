import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ProductService } from '../../api/oneproduct.service';
import { IDetailedProduct } from '../../Interface/detailedproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  oneProduct!: IDetailedProduct | undefined;

  destroy$ = new ReplaySubject<void>(1);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ProductService: ProductService
  ) {}

  openConfig(param: string): void {
    this.router.navigate(['configurator', param]);
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
    this.ProductService.getProductDetails(
      this.route.snapshot.paramMap.get('id') || ''
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.oneProduct = data;
        },
      });
  }

  ngOnInit(): void {
    this.getProductDetailsById();
  }

  ngOnDestroy(): void {
    this.ProductService.setproductSubject(undefined);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
