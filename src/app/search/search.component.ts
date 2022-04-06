import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../api/products.service';
import { IProduct } from '../Interface/products';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

  query: string | null = '';

  productsBySearch: IProduct[] = [];

  searchCount: number | undefined;

  sub!: Subscription;

  visibleProducts: IProduct[] = [];

  categoryList: string[] = [];

  categories = new FormControl();

  productsFilteredByCategory: IProduct[] = [];

  _selectedCategory: string = '';

  constructor(private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService){}

  private _searchDetails: string = '';


  get searchDetails(): string {
    return this._searchDetails;
  }
  
  set searchDetails(value: string) {
    this._searchDetails = value;
  }

  set selectedCategory(value: string) {
    this._selectedCategory = value;

    this.productsFilteredByCategory = findItemsByCategory(this._selectedCategory, this.productsBySearch);
    this.visibleProducts = this.productsFilteredByCategory;

    console.log('filteredByCategory: ', this.productsFilteredByCategory)
  }


  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
    this.query = this._searchDetails;
    this.sub = this.productService.getProductsByQuery(this._searchDetails).subscribe({
      next: data => {
        this._selectedCategory = '';
        this.productsBySearch = data.results;
        this.searchCount = data.count;
        this.visibleProducts = this.productsBySearch.slice(0, 12);
        this.getCategoryList();
      }
    })
  }


  toProductDetailPage(id: number): void {
    this.router.navigate(["product", id]);
  }

  onPageChange(event: PageEvent, array: IProduct[]) {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

      if(endIndex > array.length) {
        endIndex = array.length
      }

    this.visibleProducts = array.slice(startIndex, endIndex);
  }

  getCategoryList() {
    const unfilteredCategories: string[] = [];

    this.productsBySearch.map(item => {
     unfilteredCategories.push(item.category)
    })

    const uniqueCategories = findUniqueItems(unfilteredCategories);

    this.categoryList = uniqueCategories;
    
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');

      if(this.query) {
        this.sub = this.productService.getProductsByQuery(this.query).subscribe({
          next: data => {
            this.productsBySearch = data.results;
            this.searchCount = data.count;
            this.visibleProducts = this.productsBySearch.slice(0, 12);
            this.getCategoryList();
          }
        })
      }
    }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}


const findUniqueItems = (arr: string[]) => arr.filter((item, pos) => {
  return arr.indexOf(item) === pos;
})

const findItemsByCategory = (category: string, arr: IProduct[]) => 
            arr.filter(el => el.category === category);