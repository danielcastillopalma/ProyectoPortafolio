import { TestBed } from '@angular/core/testing';

import { PhotoaiService } from './photoai.service';

describe('PhotoaiService', () => {
  let service: PhotoaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
