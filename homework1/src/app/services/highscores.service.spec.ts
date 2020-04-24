import { TestBed } from "@angular/core/testing";

import { HighScoresService } from "./highscores.service";

describe("HighscoresService", () => {
  let service: HighScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighScoresService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
