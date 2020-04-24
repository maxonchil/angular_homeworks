import { GameStatuses } from "./../enums/game-statuses.enum";
import { Score } from "./../interfaces/score";
import { HighScoresService } from "./highscores.service";
import { GameOptions } from "./../interfaces/game-options";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GameConfigService {

  private gameOptions: GameOptions = {
    timer: 10,
    totalClicks: 0,
    gameState: false,
    clickerStatus: GameStatuses.disabled
  };

  constructor(private highScoresService: HighScoresService) {}

  public startGame(): void {
    this.gameOptions.gameState = true;
    this.gameOptions.clickerStatus = GameStatuses.active;
  }
  public finishGame(score: Score): void {
    this.gameOptions.gameState = false;
    this.gameOptions.clickerStatus = GameStatuses.disabled;
    this.highScoresService.setScore(score);
  }
  public setUserName(name: string): void {
    this.gameOptions.userName = name;
  }
  public setTotalClicks(clicks: number): void {
    this.gameOptions.totalClicks = clicks;
  }
  public playAgain(): void {
    this.gameOptions.timer = 10;
    this.gameOptions.totalClicks = 0;
  }
  public getGameOptions(): GameOptions {
    return this.gameOptions;
  }
}
