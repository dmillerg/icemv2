import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCatalogoComponent } from './section-catalogo.component';

describe('SectionCatalogoComponent', () => {
  let component: SectionCatalogoComponent;
  let fixture: ComponentFixture<SectionCatalogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionCatalogoComponent]
    });
    fixture = TestBed.createComponent(SectionCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
