import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorServiceInterceptor } from './loader-interceptor-service.interceptor';

describe('LoaderInterceptorServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoaderInterceptorServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoaderInterceptorServiceInterceptor = TestBed.inject(LoaderInterceptorServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
