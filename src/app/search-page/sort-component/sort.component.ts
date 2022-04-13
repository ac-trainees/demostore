import { Component, EventEmitter, OnChanges, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-search-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})

export class SortComponent implements OnChanges {

  @Output() releaseDateChanged: EventEmitter<string> = new EventEmitter();

  releaseDateList: string[] = ['Newest', 'Oldest'];

  releaseDate = new FormControl();

  private _selectedReleaseDate: string = '';

  set selectedReleaseDate(value: string) {
    this._selectedReleaseDate = value;
    this.releaseDateChanged.emit(this.selectedReleaseDate);

  }
  get selectedReleaseDate() {
    return this._selectedReleaseDate;
  }
}
