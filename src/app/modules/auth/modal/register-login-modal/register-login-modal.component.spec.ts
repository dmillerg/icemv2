import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginModalComponent } from './register-login-modal.component';

describe('RegisterLoginModalComponent', () => {
  let component: RegisterLoginModalComponent;
  let fixture: ComponentFixture<RegisterLoginModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterLoginModalComponent]
    });
    fixture = TestBed.createComponent(RegisterLoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
