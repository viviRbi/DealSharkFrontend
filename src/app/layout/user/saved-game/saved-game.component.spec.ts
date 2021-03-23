import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGameComponent } from './saved-game.component';

describe('SavedGameComponent', () => {
  let component: SavedGameComponent;
  let fixture: ComponentFixture<SavedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
