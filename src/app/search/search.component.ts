import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../api/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, AfterViewInit {

  query: string | null = '';

  products: any[] = [];

  sub!: Subscription;

  errorMessage: any;

  constructor(private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService,
                private elementRef: ElementRef){}

  toProductDetail(id: number): void {
    this.router.navigate(["product", id]);
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');
    console.log('query: ', this.query)

    this.sub = this.productService.getProducts().subscribe({
      next: products => { 
          this.products = products
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = 'rgba(218, 219, 219, 0.445)';
}

}
