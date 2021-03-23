import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedGameComponent } from './owned-game.component';

describe('OwnedGameComponent', () => {
  let component: OwnedGameComponent;
  let fixture: ComponentFixture<OwnedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnedGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
