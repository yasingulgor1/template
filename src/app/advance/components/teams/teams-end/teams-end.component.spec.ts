import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsEndComponent } from './teams-end.component';

describe('TeamsEndComponent', () => {
  let component: TeamsEndComponent;
  let fixture: ComponentFixture<TeamsEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
