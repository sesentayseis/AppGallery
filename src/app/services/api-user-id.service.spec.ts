import { TestBed } from '@angular/core/testing';

import { ApiUserIdService } from './api-user-id.service';

describe('ApiUserIdService', () => {
  let service: ApiUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
