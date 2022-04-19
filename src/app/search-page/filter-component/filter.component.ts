import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { FilterService } from "src/app/services/filter.services";

@Component({
  selector: 'app-search-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})

export class FilterComponent implements OnDestroy, OnInit {

  @Input() categoryList: string[] = [];
  @Input() statusList: string[] = [];

  private readonly destroy$ = new Subject<void>();

  private _selectedCategory: string = '';

  private _selectedStatus: string = '';

  categories = new FormControl();

  status = new FormControl();

  constructor(private filterService: FilterService) { }

  set selectedCategory(value: string) {
    this.filterService.resetStatusData();
    this.filterService.resetReleaseDateData();
    this._selectedCategory = value;
    this.filterService.setCategoryData(this.selectedCategory);
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  set selectedStatus(value: string) {
    this.filterService.resetReleaseDateData();
    this.filterService.resetCategoryData();
    this._selectedStatus = value;
    this.filterService.setStatusData(this.selectedStatus);
  }

  get selectedStatus() {
    return this._selectedStatus;
  }

  ngOnInit() {
    this.filterService.categoryData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this._selectedCategory = data;
      });

    this.filterService.statusData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this._selectedStatus = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
