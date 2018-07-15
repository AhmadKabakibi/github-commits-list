import { Component, EventEmitter, Output } from '@angular/core';
import { CommitsFilterData } from './commits-filter-data';

@Component({
  selector: 'app-commits-filter',
  templateUrl: './commits-filter.component.html',
  styleUrls: ['./commits-filter.component.scss']
})
export class CommitsFilterComponent {
  since: Date;
  until: Date;

  @Output()
  filterChanged = new EventEmitter<CommitsFilterData>();

  search(): void {
    this.filterChanged.emit(new CommitsFilterData(this.since, this.until));
  }

  clear(): void {
    this.since = undefined;
    this.until = undefined;
  }
}
