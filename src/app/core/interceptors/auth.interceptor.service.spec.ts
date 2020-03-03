import { TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './auth.interceptor.service';

describe('Auth.InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.get(AuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
