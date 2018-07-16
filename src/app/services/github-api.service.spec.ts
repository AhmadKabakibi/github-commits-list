import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GithubApiService, GITHUB_REPO, TOKEN } from './github-api.service';
import { mockCommits } from '../mocks/mock-commits';

let service: GithubApiService;
let httpTestingController: HttpTestingController;

describe('GithubApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        GithubApiService,
        {
          provide: GITHUB_REPO,
          useValue: 'angular/material2'
        },
        {
          provide: TOKEN,
          useValue: 'fakeToken'
        }
      ],
    });

    service = TestBed.get(GithubApiService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get a list of commits', () => {
    service.getAll().subscribe();

    const req = httpTestingController.expectOne('https://api.github.com/repos/angular/material2/commits');
    req.flush(mockCommits);
  });

  it('should get a list of commits with a specified page number', () => {
    service.getAll(10).subscribe();
    const req = httpTestingController.expectOne(
      'https://api.github.com/repos/angular/material2/commits?page=10'
    );
    req.flush(mockCommits);
  });

  it('should get a list of commits with since and until date or just one', () => {
    const sinceDate = new Date();
    const untilDate = new Date();

    service.getAll(undefined, sinceDate).subscribe();
    let req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/material2/commits?since=${sinceDate.toISOString()}`
    );
    req.flush(mockCommits);

    service.getAll(undefined, undefined, untilDate).subscribe();
    req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/material2/commits?until=${untilDate.toISOString()}`
    );
    req.flush(mockCommits);

    service.getAll(undefined, sinceDate, untilDate).subscribe();
    req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/material2/commits?since=${sinceDate.toISOString()}&until=${untilDate.toISOString()}`
    );
    req.flush(mockCommits);
  });

  it('should get a list of commits with a page number and since and/or until date', () => {
    const sinceDate = new Date();
    const untilDate = new Date();

    service.getAll(10, sinceDate, untilDate).subscribe();
    const req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/material2/commits?page=10&since=${sinceDate.toISOString()}&until=${untilDate.toISOString()}`
    );
    req.flush(mockCommits);
  });

  it('should get a specified commit', () => {
    service.getCommit('3255cf3c3675037725ea579fcdfa373d06977fb4').subscribe();

    const req = httpTestingController.expectOne(
      'https://api.github.com/repos/angular/material2/commits/3255cf3c3675037725ea579fcdfa373d06977fb4'
    );
    req.flush(mockCommits);
  });

});
