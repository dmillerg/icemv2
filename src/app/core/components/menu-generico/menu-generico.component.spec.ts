import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGenericoComponent } from './menu-generico.component';

describe('MenuGenericoComponent', () => {
  let component: MenuGenericoComponent;
  let fixture: ComponentFixture<MenuGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuGenericoComponent]
    });
    fixture = TestBed.createComponent(MenuGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
