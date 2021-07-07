import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSilentStartComponent } from './teams-silent-start.component';

describe('TeamsSilentStartComponent', () => {
  let component: TeamsSilentStartComponent;
  let fixture: ComponentFixture<TeamsSilentStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsSilentStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsSilentStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
