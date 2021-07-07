import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsConfigComponent } from './teams-config.component';

describe('TeamsConfigComponent', () => {
  let component: TeamsConfigComponent;
  let fixture: ComponentFixture<TeamsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
