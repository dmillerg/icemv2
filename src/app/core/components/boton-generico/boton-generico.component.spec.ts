import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonGenericoComponent } from './boton-generico.component';

describe('BotonGenericoComponent', () => {
  let component: BotonGenericoComponent;
  let fixture: ComponentFixture<BotonGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BotonGenericoComponent]
    });
    fixture = TestBed.createComponent(BotonGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
