import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSilentEndComponent } from './teams-silent-end.component';

describe('TeamsSilentEndComponent', () => {
  let component: TeamsSilentEndComponent;
  let fixture: ComponentFixture<TeamsSilentEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsSilentEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsSilentEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
