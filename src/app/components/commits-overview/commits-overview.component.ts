import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/internal/operators';

import { GithubApiService } from '../../services';
import { CommitsOverview, CommitDetails } from '../../data';
import { CommitsFilterData } from '../commits-filter/commits-filter-data';

interface SearchCriteria {
  filterData: CommitsFilterData;
  pageNumber: number;
}

@Component({
  selector: 'app-commits-overview',
  templateUrl: './commits-overview.component.html',
  styleUrls: ['./commits-overview.component.scss']
})

export class CommitsOverviewComponent implements OnInit, OnDestroy {
  temp = ['author', 'message', 'committed on'];
  commitsList: CommitDetails[] = [];
  currentPageNumber = 1;
  lastPageNumber = 1;
  isLoading = false;

  private filterData: CommitsFilterData = new CommitsFilterData();
  private searchCommits = new Subject<SearchCriteria>();
  private unsubscribe = new Subject();

  constructor(
    private githubService: GithubApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCommits();
  }

  getCommits(): void {
    this.searchCommits.pipe(
      startWith({ filterData: new CommitsFilterData(), pageNumber: this.currentPageNumber }),
      switchMap(c => {
        this.isLoading = true;
        return this.githubService.getAll(c.pageNumber, c.filterData.sinceDate, c.filterData.untilDate);
      }),
      map(result => {
        this.isLoading = false;
        this.lastPageNumber = result.lastPageNumber;
        return result.commits;
      }),
      catchError(() => {
        this.isLoading = false;
        return of([]);
      }),
      takeUntil(this.unsubscribe),
    ).subscribe(commits => {
      this.commitsList = commits;
    });
  }

  onCommitClick(sha: CommitDetails): void {
    this.router.navigate(['/commit', sha]);
  }

  ngOnDestroy() {
    this.searchCommits.complete();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
