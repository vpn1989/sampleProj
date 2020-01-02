import { TestBed } from "@angular/core/testing";

import { ApplicationsMockService } from "./applications-mock.service";

describe("ApplicationsMockService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ApplicationsMockService = TestBed.get(
      ApplicationsMockService
    );
    expect(service).toBeTruthy();
  });
});
