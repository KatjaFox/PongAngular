import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalScoreHistoryComponent } from './personal-score-history.component';

describe('PersonalScoreHistoryComponent', () => {
  let component: PersonalScoreHistoryComponent;
  let fixture: ComponentFixture<PersonalScoreHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalScoreHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalScoreHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
