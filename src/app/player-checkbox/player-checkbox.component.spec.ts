import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCheckboxComponent } from './player-checkbox.component';

describe('PlayerCheckboxComponent', () => {
  let component: PlayerCheckboxComponent;
  let fixture: ComponentFixture<PlayerCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
