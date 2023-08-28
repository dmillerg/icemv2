import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuienesSomosItemComponent } from './quienes-somos-item.component';

describe('QuienesSomosItemComponent', () => {
  let component: QuienesSomosItemComponent;
  let fixture: ComponentFixture<QuienesSomosItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuienesSomosItemComponent]
    });
    fixture = TestBed.createComponent(QuienesSomosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
