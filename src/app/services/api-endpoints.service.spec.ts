import { TestBed, inject } from '@angular/core/testing';

import { ApiEndpoints } from './api-endpoints.service';

describe('ApiEndpointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiEndpoints]
    });
  });

  it('should be created', inject([ApiEndpoints], (service: ApiEndpoints) => {
    expect(service).toBeTruthy();
  }));
});
