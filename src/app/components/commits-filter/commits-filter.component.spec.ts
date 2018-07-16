import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CommitsFilterComponent } from './commits-filter.component';

describe('CommitsFilterComponent', () => {
  let component: CommitsFilterComponent;
  let fixture: ComponentFixture<CommitsFilterComponent>;
  let de;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommitsFilterComponent,
        CommitsFilterComponent,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommitsFilterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
