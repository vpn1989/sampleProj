import { TestBed } from '@angular/core/testing';

import { SubscriptionRequestMockService } from './subscription-request-mock.service';

describe('SubscriptionRequestMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscriptionRequestMockService = TestBed.get(SubscriptionRequestMockService);
    expect(service).toBeTruthy();
  });
});
