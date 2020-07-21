import { TestBed } from '@angular/core/testing';

import { CanAuthenticationGuardServiceService } from './can-authentication-guard-service.service';

describe('CanAuthenticationGuardServiceService', () => {
  let service: CanAuthenticationGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanAuthenticationGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
