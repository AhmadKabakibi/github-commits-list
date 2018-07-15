import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsOverviewComponent } from './commits-overview.component';

describe('CommitsOverviewComponent', () => {
  let component: CommitsOverviewComponent;
  let fixture: ComponentFixture<CommitsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
