import { TestBed } from "@angular/core/testing";

import { VendorsMockService } from "./vendors-mock.service";

describe("VendorsService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: VendorsMockService = TestBed.get(VendorsMockService);
    expect(service).toBeTruthy();
  });
});
