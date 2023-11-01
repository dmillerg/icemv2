import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGenericoComponent } from './detalle-generico.component';

describe('DetalleGenericoComponent', () => {
  let component: DetalleGenericoComponent;
  let fixture: ComponentFixture<DetalleGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetalleGenericoComponent]
    });
    fixture = TestBed.createComponent(DetalleGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
