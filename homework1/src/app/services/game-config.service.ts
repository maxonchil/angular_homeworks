import { GameStatuses } from "./../enums/game-statuses.enum";
import { Score } from "./../interfaces/score";
import { HighScoresService } from "./highscores.service";
import { GameOptions } from "./../interfaces/game-options";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GameConfigService {
  private gameOptions: GameOptions;

  constructor(private _highScoresService: HighScoresService) {
    this.gameOptions = {
      timer: 10,
      totalClicks: 0,
      gameState: false,
      clickerStatus: GameStatuses.disabled,
    };
  }

  startGame(): void {
    this.gameOptions.gameState = true;
    this.gameOptions.clickerStatus = GameStatuses.active;
  }
  finishGame(score: Score): void {
    this.gameOptions.gameState = false;
    this.gameOptions.timer = 10;
    this.gameOptions.totalClicks = 0;
    this.gameOptions.clickerStatus = GameStatuses.disabled;
    this._highScoresService.setScore(score);
  }
  setUserName(name: string): void {
    this.gameOptions.userName = name;
  }
  setTotalClicks(clicks: number): void {
    this.gameOptions.totalClicks = clicks;
  }
  playAgain(): void {
    this.gameOptions.timer = 10;
    this.gameOptions.totalClicks = 0;
  }
  getGameOptions(): GameOptions {
    return this.gameOptions;
  }
}
