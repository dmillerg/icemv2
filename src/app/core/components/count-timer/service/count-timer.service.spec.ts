import { TestBed } from '@angular/core/testing';

import { CountTimerService } from './count-timer.service';

describe('CountTimerService', () => {
  let service: CountTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
