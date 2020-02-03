import { TestBed } from '@angular/core/testing';

import { GeoStorageService } from './geo-storage.service';

describe('GeoStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoStorageService = TestBed.get(GeoStorageService);
    expect(service).toBeTruthy();
  });
});
