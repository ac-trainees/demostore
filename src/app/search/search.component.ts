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

  isDataProvided: boolean = true;

  constructor(private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService,
                private elementRef: ElementRef){}


  ///////Input

  private _searchDetails: string = '';

  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
    console.log('search: ', this._searchDetails)
  }
  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
  }

  ///////////////

  toProductDetail(id: number): void {
    this.router.navigate(["product", id]);
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');
    console.log('query: ', this.query)

    this.sub = this.productService.productData$.subscribe(
      data => { 
          if(data.length === 0) {
              this.isDataProvided = false;
          } else {
              this.products = data;
              this.isDataProvided = true;
          }
      }
  ) 

  if(this.isDataProvided === false) {
      this.productService.getProducts().subscribe({
          next: data => {
              this.products = data;
              }
          })
        }
    }
  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = 'rgba(218, 219, 219, 0.445)';
}

}
