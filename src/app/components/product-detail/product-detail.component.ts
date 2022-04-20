import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { OneProductService } from '../../api/oneproduct.service';
import { IOneSingleProduct } from '../../Interface/singleproduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  oneProduct!: IOneSingleProduct | undefined;

  destroy$ = new ReplaySubject<void>(1);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public oneProductService: OneProductService
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

  ngOnInit(): void {
    this.oneProductService
      .getSingleProductDetails(this.route.snapshot.paramMap.get('id') || '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.oneProduct = data;
        },
      });
  }

  ngOnDestroy(): void {
    this.oneProductService.setOneProductSubject(undefined);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
