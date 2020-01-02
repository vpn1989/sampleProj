import { TestBed } from '@angular/core/testing';

import { AccountRequestMockService } from './account-request-mock.service';

describe('AccountRequestMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountRequestMockService = TestBed.get(AccountRequestMockService);
    expect(service).toBeTruthy();
  });
});
