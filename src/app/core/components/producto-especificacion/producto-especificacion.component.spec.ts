import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEspecificacionComponent } from './producto-especificacion.component';

describe('ProductoEspecificacionComponent', () => {
  let component: ProductoEspecificacionComponent;
  let fixture: ComponentFixture<ProductoEspecificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoEspecificacionComponent]
    });
    fixture = TestBed.createComponent(ProductoEspecificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
