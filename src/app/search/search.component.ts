import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ProductService } from '../api/products.service';
import { QueryService } from '../api/query.service';
import { IProduct } from '../Interface/products';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})

export class SearchComponent implements OnInit, OnDestroy {
  query: string | null = '';

  allProductsBySearch: IProduct[] = [];

  filteredProducts: IProduct[] = [];

  searchCount: number | undefined;

  sub!: Subscription;

  visibleProducts: IProduct[] = [];

  categoryList: string[] = [];

  statusList: string[] = [];

  releaseDateList: string[] = ['Newest', 'Oldest'];

  categories = new FormControl();

  status = new FormControl();

  releaseDate = new FormControl();

  private _selectedCategory: string = '';

  private _selectedStatus: string = '';

  private _selectedReleaseDate: string = '';

  private readonly destroy$ = new Subject<void>();

  private _searchDetails: string = '';

  breakPoint!: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private queryService: QueryService) { }

  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
  }

  set selectedCategory(value: string) {
    this.resetFilterValues();
    this._selectedCategory = value;

    this.filteredProducts = findItemsByCategory(this._selectedCategory, this.allProductsBySearch);
    this.visibleProducts = this.filteredProducts.slice(0, 12);
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  set selectedStatus(value: string) {
    this.resetFilterValues();
    this._selectedStatus = value;

    this.filteredProducts = findItemsByStatus(this._selectedStatus, this.allProductsBySearch);
    this.visibleProducts = this.filteredProducts.slice(0, 12);
  }

  get selectedStatus() {
    return this._selectedStatus;
  }

  set selectedReleaseDate(value: string) {
    this._selectedReleaseDate = value;

    if (this.filteredProducts.length === 0) {
      sortProductsByReleaseDate(this.allProductsBySearch, value);
      this.visibleProducts = this.allProductsBySearch.slice(0, 12);
    }

    if (this.filteredProducts.length > 0) {
      sortProductsByReleaseDate(this.filteredProducts, value);
      this.visibleProducts = this.filteredProducts.slice(0, 12);
    }
  }

  get selectedReleaseDate() {
    return this._selectedReleaseDate;
  }

  onResize(event: any) {
    this.breakPoint = (event.target.innerWidth < 1200) ? 2 : 3;
  }

  resetFilterValues() {
    this._selectedStatus = '';
    this._selectedCategory = '';
    this._selectedReleaseDate = '';
  }

  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
    this.query = this._searchDetails;
    this.productService.getProductsByQuery(this._searchDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.resetFilterValues();
          this.allProductsBySearch = data.results;
          this.searchCount = data.count;
          this.visibleProducts = this.allProductsBySearch.slice(0, 12);
          this.getCategoryList();
          this.getStatusList();
        }
      })
  }

  toProductDetailPage(id: number): void {
    this.router.navigate(["product", id]);
  }

  onPageChange(event: PageEvent, productsArray: IProduct[]) {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > productsArray.length) {
      endIndex = productsArray.length
    }
    this.visibleProducts = productsArray.slice(startIndex, endIndex);

  }

  getCategoryList() {
    const unfilteredCategories: string[] = [];

    this.allProductsBySearch.map(item => {
      unfilteredCategories.push(item.category)
    })
    const uniqueCategories = findUniqueItems(unfilteredCategories);

    this.categoryList = uniqueCategories;
  }

  getStatusList() {
    const unfilteredStatusList: string[] = [];

    this.allProductsBySearch.map(item => {
      unfilteredStatusList.push(item.status)
    })
    const uniqueStatusList = findUniqueItems(unfilteredStatusList);

    this.statusList = uniqueStatusList;
  }

  ngOnInit(): void {
    this.breakPoint = (window.innerWidth < 1000) ? 2 : 3;

    this.query = this.route.snapshot.paramMap.get("query");

    this.queryService.queryData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        if (query) {
          this.productService.getProductsByQuery(query)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: data => {
                this.resetFilterValues();
                this.allProductsBySearch = data.results;
                this.searchCount = data.count;
                this.query = query;
                this.visibleProducts = this.allProductsBySearch.slice(0, 12);
                this.getCategoryList();
                this.getStatusList();
              }
            })
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


const findUniqueItems = (arr: string[]) => arr.filter((item, pos) => {
  return arr.indexOf(item) === pos;
})

const findItemsByCategory = (category: string, arr: IProduct[]) =>
  arr.filter(el => el.category === category);

const findItemsByStatus = (status: string, arr: IProduct[]) =>
  arr.filter(el => el.status === status);


const sortProductsByReleaseDate = (array: IProduct[], date: string) => {
  switch (date) {
    case 'Newest':
      array.sort((a, b) =>
        Number(new Date(b.releaseDate)) - Number(new Date(a.releaseDate)));
      break;

    case 'Oldest':
      array.sort((a, b) =>
        Number(new Date(a.releaseDate)) - Number(new Date(b.releaseDate)));
      break;
    default: ;
  }
}








