import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountTimerComponent } from './count-timer.component';

describe('CountTimerComponent', () => {
  let component: CountTimerComponent;
  let fixture: ComponentFixture<CountTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CountTimerComponent]
    });
    fixture = TestBed.createComponent(CountTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
