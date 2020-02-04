import { TestBed } from '@angular/core/testing';

import { DayStorageService } from './day-storage.service';

describe('DayStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayStorageService = TestBed.get(DayStorageService);
    expect(service).toBeTruthy();
  });
});
