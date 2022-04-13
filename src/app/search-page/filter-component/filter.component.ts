import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-search-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})

export class FilterComponent {

  @Input() categoryList: string[] = [];
  @Input() statusList: string[] = [];
  @Input() query: string | null = '';

  @Output() categoryChanged: EventEmitter<string> = new EventEmitter();
  @Output() statusChanged: EventEmitter<string> = new EventEmitter()

  private _selectedCategory: string = '';

  private _selectedStatus: string = '';

  categories = new FormControl();

  status = new FormControl();

  set selectedCategory(value: string) {
    this.resetFilterValues();
    this._selectedCategory = value;
    this.categoryChanged.emit(this.selectedCategory);
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  set selectedStatus(value: string) {
    this.resetFilterValues();
    this._selectedStatus = value;
    this.statusChanged.emit(this.selectedStatus);
  }

  get selectedStatus() {
    return this._selectedStatus;
  }

  resetFilterValues() {
    this._selectedStatus = '';
    this._selectedCategory = '';
  }
}
