import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { GithubApiService } from '../../services';
import { mockCommits } from '../../mocks/mock-commits';
import { CommitDetailsComponent } from './commit-details.component';

describe('CommitDetailsComponent', () => {
  let component: CommitDetailsComponent;
  let fixture: ComponentFixture<CommitDetailsComponent>;
  let httpTestingController: HttpTestingController;
  let de;

  let githubServiceStub = {
    getCommit: () => {}
  };

  let activeRouteStub = {
    params: [{id: '3255cf3c3675037725ea579fcdfa373d06977fb4'}],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommitDetailsComponent,
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: GithubApiService, useValue: githubServiceStub },
        { provide: ActivatedRoute, useValue: activeRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommitDetailsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    httpTestingController = TestBed.get(HttpTestingController);
    githubServiceStub = TestBed.get(GithubApiService);
    activeRouteStub = TestBed.get(ActivatedRoute);

    spyOn(githubServiceStub, 'getCommit').and.returnValue(of(mockCommits[0]));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
