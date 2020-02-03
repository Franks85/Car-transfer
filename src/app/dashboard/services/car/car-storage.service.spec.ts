import { TestBed } from '@angular/core/testing';

import { CarStorageService } from './car-storage.service';

describe('CarStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarStorageService = TestBed.get(CarStorageService);
    expect(service).toBeTruthy();
  });
});
