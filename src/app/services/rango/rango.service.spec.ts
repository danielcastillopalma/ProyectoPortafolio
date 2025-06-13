import { TestBed } from '@angular/core/testing';

import { RangoService } from './rango.service';

describe('RangoService', () => {
  let service: RangoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
