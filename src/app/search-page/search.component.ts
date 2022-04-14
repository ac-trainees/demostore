import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../api/products.service';
import { QueryService } from '../api/query.service';
import { IProduct } from '../Interface/products';
import { FilterService } from '../services/filter.services';


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

  visibleProducts: IProduct[] = [];

  categoryList: string[] = [];

  statusList: string[] = [];

  selectedCategory: string = '';

  selectedStatus: string = '';

  selectedReleaseDate: string = '';

  private readonly destroy$ = new Subject<void>();

  private _searchDetails: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private queryService: QueryService,
    private filterService: FilterService) { }


  get searchDetails(): string {
    return this._searchDetails;
  }

  set searchDetails(value: string) {
    this._searchDetails = value;
  }

  resetFilterValues() {
    this.selectedStatus = '';
    this.selectedCategory = '';
    this.selectedReleaseDate = '';
  }

  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
    this.query = this._searchDetails;

    this.productService.getProductsByQuery(this._searchDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.resetFilterValues();
          this.filteredProducts = [];
          this.allProductsBySearch = data.results;
          this.searchCount = data.count;
          this.visibleProducts = this.allProductsBySearch.slice(0, 12);
          this.getCategoryList();
          this.getStatusList();
        }
      })
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
/*
  onCategoryChange(category: string) {
    this.resetFilterValues();
    this.selectedCategory = category;

    this.filteredProducts = findItemsByCategory(this.selectedCategory, this.allProductsBySearch);
    this.visibleProducts = this.filteredProducts.slice(0, 12);
  }

  onStatusChange(status: string) {
    this.resetFilterValues();
    this.selectedStatus = status;

    this.filteredProducts = findItemsByStatus(this.selectedStatus, this.allProductsBySearch);
    this.visibleProducts = this.filteredProducts.slice(0, 12);
  }

  onReleaseDateChange(value: string) {
    this.selectedReleaseDate = value;

    if (this.filteredProducts.length === 0) {
      sortProductsByReleaseDate(this.allProductsBySearch, value);
      this.visibleProducts = this.allProductsBySearch.slice(0, 12);
    } else {
      sortProductsByReleaseDate(this.filteredProducts, value);
      this.visibleProducts = this.filteredProducts.slice(0, 12);
    }
  } */

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get("query");

    this.filterService.categoryData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(category => {
        this.resetFilterValues();
        this.selectedCategory = category;
        this.filteredProducts = findItemsByCategory(this.selectedCategory, this.allProductsBySearch);
        this.visibleProducts = this.filteredProducts.slice(0, 12);
      })

    this.filterService.statusData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.resetFilterValues();
        this.selectedStatus = status;
        this.filteredProducts = findItemsByStatus(this.selectedStatus, this.allProductsBySearch);
        this.visibleProducts = this.filteredProducts.slice(0, 12);
      })

    this.filterService.releaseDateData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.selectedReleaseDate = value;
            if (this.filteredProducts.length === 0) {
              sortProductsByReleaseDate(this.allProductsBySearch, value);
              this.visibleProducts = this.allProductsBySearch.slice(0, 12);
            } else {
              sortProductsByReleaseDate(this.filteredProducts, value);
              this.visibleProducts = this.filteredProducts.slice(0, 12);
            }
      })

    if (this.query) {
      this.productService.getProductsByQuery(this.query)
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








