import { TestBed } from '@angular/core/testing';

import { FeatureStorageService } from './feature-storage.service';

describe('FeatureStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeatureStorageService = TestBed.get(FeatureStorageService);
    expect(service).toBeTruthy();
  });
});
