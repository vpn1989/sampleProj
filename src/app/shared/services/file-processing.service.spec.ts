import { TestBed } from "@angular/core/testing";

import { FileProcessingService } from "./file-processing.service";

describe("FileProcessingService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FileProcessingService = TestBed.get(FileProcessingService);
    expect(service).toBeTruthy();
  });
});
