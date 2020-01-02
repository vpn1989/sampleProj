import { TestBed } from "@angular/core/testing";

import { CompaniesMockService } from "./companies-mock.service";

describe("CompaniesMockService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CompaniesMockService = TestBed.get(CompaniesMockService);
    expect(service).toBeTruthy();
  });
});
