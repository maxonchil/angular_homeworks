import { Injectable } from "@angular/core";
import { GameState } from "./game-state";

@Injectable({
  providedIn: "root",
})
export class GameStateService {
  gameState: GameState = {
    state: "start",
    gameStart: false,
    gameFinished: false,
  };

  constructor() {}

  getStates(): GameState {
    return this.gameState;
  }
  setStates(prop: string, value: string | boolean): void {
    this.gameState[prop] = value;
  }
}
