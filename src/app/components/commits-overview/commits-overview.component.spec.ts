import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubApiService } from '../../services';
import { Router } from '@angular/router';
import { mockCommits } from '../../mocks/mock-commits';
import { FirstLinePipe } from '../../pipes/first-line-pipe';
import { of } from 'rxjs';

import { CommitsOverviewComponent } from './commits-overview.component';

describe('CommitsOverviewComponent', () => {
  let component: CommitsOverviewComponent;
  let fixture: ComponentFixture<CommitsOverviewComponent>;
  let httpTestingController: HttpTestingController;
  let de;

  let githubServiceStub = {
    getAll: () => { }
  };

  let routerStub = {
    navigate: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommitsOverviewComponent,
        FirstLinePipe
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: GithubApiService,
          useValue: githubServiceStub
        },
        {
          provide: Router,
          useValue: routerStub
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommitsOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    httpTestingController = TestBed.get(HttpTestingController);
    githubServiceStub = TestBed.get(GithubApiService);
    routerStub = TestBed.get(Router);

    spyOn(githubServiceStub, 'getAll').and.returnValue(of({ commits: mockCommits, lastPageNumber: 50 }));
    spyOn(routerStub, 'navigate');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve list of commits in onInit', fakeAsync(() => {
    component.ngOnInit();

    expect(githubServiceStub.getAll).toHaveBeenCalled();
    expect(component.commitsList).toBeDefined();

    fixture.detectChanges();
    tick();
  }));
});
