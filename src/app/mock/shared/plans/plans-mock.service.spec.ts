import { TestBed } from "@angular/core/testing";

import { PlansMockService } from "./plans-mock.service";

describe("PlansMockService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PlansMockService = TestBed.get(PlansMockService);
    expect(service).toBeTruthy();
  });
});
