import { TestBed } from '@angular/core/testing';

import { HttpConfigInterceptor } from './httpConfig.interceptor';

describe('HttpConfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpConfigInterceptor = TestBed.get(HttpConfigInterceptor);
    expect(service).toBeTruthy();
  });
});
