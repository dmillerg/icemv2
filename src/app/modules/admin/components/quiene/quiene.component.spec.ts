import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuieneComponent } from './quiene.component';

describe('QuieneComponent', () => {
  let component: QuieneComponent;
  let fixture: ComponentFixture<QuieneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuieneComponent]
    });
    fixture = TestBed.createComponent(QuieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
