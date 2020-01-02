import { TestBed } from '@angular/core/testing';

import { FileDimensionValidatorService } from './file-dimension-validator.service';

describe('FileDimensionValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileDimensionValidatorService = TestBed.get(FileDimensionValidatorService);
    expect(service).toBeTruthy();
  });
});
