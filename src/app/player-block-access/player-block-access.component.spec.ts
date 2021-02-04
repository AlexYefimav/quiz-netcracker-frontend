import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBlockAccessComponent } from './player-block-access.component';

describe('PlayerBlockAccessComponent', () => {
  let component: PlayerBlockAccessComponent;
  let fixture: ComponentFixture<PlayerBlockAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBlockAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBlockAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
