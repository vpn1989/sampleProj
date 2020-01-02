import { TestBed } from "@angular/core/testing";

import { IndustriesMockService } from "./industries-mock.service";

describe("IndustriesMockService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: IndustriesMockService = TestBed.get(IndustriesMockService);
    expect(service).toBeTruthy();
  });
});
