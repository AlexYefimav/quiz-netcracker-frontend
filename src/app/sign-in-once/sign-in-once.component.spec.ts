import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOnceComponent } from './sign-in-once.component';

describe('SignInOnceComponent', () => {
  let component: SignInOnceComponent;
  let fixture: ComponentFixture<SignInOnceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInOnceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInOnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
