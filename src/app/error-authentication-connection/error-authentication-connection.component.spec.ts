import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAuthenticationConnectionComponent } from './error-authentication-connection.component';

describe('ErrorAuthenticationConnectionComponent', () => {
  let component: ErrorAuthenticationConnectionComponent;
  let fixture: ComponentFixture<ErrorAuthenticationConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorAuthenticationConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAuthenticationConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
