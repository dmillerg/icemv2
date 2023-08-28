import { TestBed } from '@angular/core/testing';

import { DesarrollosService } from './desarrollos.service';

describe('DesarrollosService', () => {
  let service: DesarrollosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesarrollosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
