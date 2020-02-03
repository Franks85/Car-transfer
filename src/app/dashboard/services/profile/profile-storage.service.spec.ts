import { TestBed } from '@angular/core/testing';

import { ProfileStorageService } from './profile-storage.service';

describe('ProfileStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileStorageService = TestBed.get(ProfileStorageService);
    expect(service).toBeTruthy();
  });
});
