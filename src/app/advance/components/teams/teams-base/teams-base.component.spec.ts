import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsBaseComponent } from './teams-base.component';

describe('TeamsBaseComponent', () => {
  let component: TeamsBaseComponent;
  let fixture: ComponentFixture<TeamsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
