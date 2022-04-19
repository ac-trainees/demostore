import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
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

  categoryFilter = 'category';

  statusFilter = 'status';

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

  setAllProductsBySearch(data: any) {
    this.filteredProducts = [];
    this.allProductsBySearch = data.results;
    this.searchCount = data.count;
    this.visibleProducts = this.allProductsBySearch.slice(0, 12);
    this.categoryList = this.getFilterList(this.categoryFilter);
    this.statusList = this.getFilterList(this.statusFilter);
  }

  onSearch(): void {
    this.router.navigate(["search", this._searchDetails]);
    this.query = this._searchDetails;

    this.productService.getProductsByQuery(this._searchDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.setAllProductsBySearch(data);
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

  getFilterList(filterParam: string) {
    const unfilteredList: string[] = [];

    if(filterParam === 'category') {
      this.allProductsBySearch.map(item => {
        unfilteredList.push(item.category)
      })
    }
    if(filterParam === 'status') {
      this.allProductsBySearch.map(item => {
        unfilteredList.push(item.status)
      })
    }
    const uniqueFilterList = findUniqueItems(unfilteredList);

    return uniqueFilterList;
  }

  filterProductsByParam(filterParam: string, filterValue: string) {
    if(filterParam === 'category') {
      this.selectedCategory = filterValue;
      this.filteredProducts = findItemsByCategory(this.selectedCategory, this.allProductsBySearch);
    }
    else if (filterParam === 'status') {
      this.selectedStatus = filterValue;
      this.filteredProducts = findItemsByStatus(this.selectedStatus, this.allProductsBySearch);
    }
    this.visibleProducts = this.filteredProducts.slice(0, 12);
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get("query");

    this.filterService.categoryData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(category => {
        this.filterProductsByParam(this.categoryFilter, category);
      })

    this.filterService.statusData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.filterProductsByParam(this.statusFilter, status);
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
            this.setAllProductsBySearch(data);
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
                this.setAllProductsBySearch(data);
                this.query = query;
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










