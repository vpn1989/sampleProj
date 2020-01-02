import { TestBed } from "@angular/core/testing";

import { BackofficeCategoriesService } from "./backoffice-categories.service";

describe("BackofficeCategoriesService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BackofficeCategoriesService = TestBed.get(
      BackofficeCategoriesService
    );
    expect(service).toBeTruthy();
  });
});
