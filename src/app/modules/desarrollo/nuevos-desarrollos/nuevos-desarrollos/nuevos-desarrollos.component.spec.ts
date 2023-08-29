import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevosDesarrollosComponent } from './nuevos-desarrollos.component';

describe('NuevosDesarrollosComponent', () => {
  let component: NuevosDesarrollosComponent;
  let fixture: ComponentFixture<NuevosDesarrollosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevosDesarrollosComponent]
    });
    fixture = TestBed.createComponent(NuevosDesarrollosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
