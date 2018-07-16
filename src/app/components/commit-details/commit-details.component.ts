import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { CommitDetails } from '../../data';
import { GithubApiService } from '../../services';

@Component({
  selector: 'app-commit-details',
  templateUrl: './commit-details.component.html',
  styleUrls: ['./commit-details.component.scss']
})
export class CommitDetailsComponent implements OnInit, OnDestroy {
  @Input()
  commitDetails: CommitDetails;

  private unsubscribe = new Subject();

  constructor(
    private githubService: GithubApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCommit();
  }

  getCommit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['sha'] !== undefined) {
        this.githubService.getCommit(params['sha']).pipe(
          takeUntil(this.unsubscribe),
        ).subscribe(commit => (this.commitDetails = commit));
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
