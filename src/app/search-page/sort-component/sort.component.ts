import { Component, EventEmitter, OnChanges, OnDestroy, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { FilterService } from "src/app/services/filter.services";

@Component({
  selector: 'app-search-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})

export class SortComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>();

  constructor(private filterService: FilterService) { }

  releaseDateList: string[] = ['Newest', 'Oldest'];

  releaseDate = new FormControl();

  private _selectedReleaseDate: string = '';

  set selectedReleaseDate(value: string) {
    this._selectedReleaseDate = value;
    this.filterService.setReleaseDateData(this.selectedReleaseDate)
  }

  get selectedReleaseDate() {
    return this._selectedReleaseDate;
  }

  ngOnInit() {
    this.filterService.categoryData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this._selectedReleaseDate = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
