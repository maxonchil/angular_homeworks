import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighScoresComponent } from './highscores.component';

describe('HighscoresComponent', () => {
  let component: HighScoresComponent;
  let fixture: ComponentFixture<HighScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});