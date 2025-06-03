import { TestBed } from '@angular/core/testing';

import { ResiduosCheckService } from './residuos-check.service';

describe('ResiduosCheckService', () => {
  let service: ResiduosCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResiduosCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
