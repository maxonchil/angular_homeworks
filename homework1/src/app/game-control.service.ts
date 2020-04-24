import { HighscoresService } from "./highscores.service";
import { UserService } from "./user.service";
import { Score } from "./score";
import { GameStateService } from "./game-state.service";
import { GameState } from "./game-state";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GameControlService {
  public gameStates: GameState = this._gameStateService.getStates();

  constructor(
    private _gameStateService: GameStateService,
    private _userService: UserService,
    private _highscoresService: HighscoresService
  ) {}

  finishGame(totalClicks: number): void {
    const score: Score = {
      clicks: totalClicks,
      name: this._userService.getUser(),
      date: new Date().toLocaleString(),
    };

    this._gameStateService.setStates("gameFinished", true);
    this._gameStateService.setStates("gameStart", false);
    this._highscoresService.setScore(score);
  }
}
