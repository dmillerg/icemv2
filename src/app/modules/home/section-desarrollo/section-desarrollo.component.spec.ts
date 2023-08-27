import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDesarrolloComponent } from './section-desarrollo.component';

describe('SectionDesarrolloComponent', () => {
  let component: SectionDesarrolloComponent;
  let fixture: ComponentFixture<SectionDesarrolloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionDesarrolloComponent]
    });
    fixture = TestBed.createComponent(SectionDesarrolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
