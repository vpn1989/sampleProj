import { TestBed } from '@angular/core/testing';

import { CategoriesMockService } from './categories-mock.service';

describe('CategoriesMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesMockService = TestBed.get(CategoriesMockService);
    expect(service).toBeTruthy();
  });
});
