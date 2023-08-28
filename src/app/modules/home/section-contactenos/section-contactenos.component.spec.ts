import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionContactenosComponent } from './section-contactenos.component';

describe('SectionContactenosComponent', () => {
  let component: SectionContactenosComponent;
  let fixture: ComponentFixture<SectionContactenosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionContactenosComponent]
    });
    fixture = TestBed.createComponent(SectionContactenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
