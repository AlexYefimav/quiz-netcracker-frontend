import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAccessComponent } from './game-access.component';

describe('GameAccessComponent', () => {
  let component: GameAccessComponent;
  let fixture: ComponentFixture<GameAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
