import { TestBed } from '@angular/core/testing';

import { RateStorageService } from './rate-storage.service';

describe('RateStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RateStorageService = TestBed.get(RateStorageService);
    expect(service).toBeTruthy();
  });
});
