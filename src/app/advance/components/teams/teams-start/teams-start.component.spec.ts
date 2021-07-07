import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsStartComponent } from './teams-start.component';

describe('TeamsStartComponent', () => {
  let component: TeamsStartComponent;
  let fixture: ComponentFixture<TeamsStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
