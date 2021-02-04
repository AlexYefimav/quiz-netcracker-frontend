import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGiveAccessComponent } from './player-give-access.component';

describe('PlayerGiveAccessComponent', () => {
  let component: PlayerGiveAccessComponent;
  let fixture: ComponentFixture<PlayerGiveAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerGiveAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGiveAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
