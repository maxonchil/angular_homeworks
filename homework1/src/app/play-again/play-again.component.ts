import { ScaleControllerService } from "./../scale-controller.service";
import { GameStateService } from "./../game-state.service";
import { GameState } from "../game-state";
import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-play-again",
  templateUrl: "./play-again.component.html",
  styleUrls: ["./play-again.component.scss"],
})
export class PlayAgainComponent implements OnInit {
  @Input() timer: number;
  @Input() totalClicks: number;

  @Output() updatedTimer: EventEmitter<number> = new EventEmitter();
  @Output() updatedClicks: EventEmitter<number> = new EventEmitter();
  public gameStates: GameState = this._gameStateService.getStates();

  constructor(
    private _gameStateService: GameStateService,
    private _scaleControllerService: ScaleControllerService
  ) {}

  ngOnInit(): void {}
  playAgain(): void {
    this._gameStateService.setStates("state", "start");
    this._gameStateService.setStates("gameStart", false);
    this._gameStateService.setStates("gameFinished", false);
    this.timer = 10;
    this.totalClicks = 0;
    this._scaleControllerService.setBreakPoints(this.totalClicks);
    this.updatedTimer.emit(this.timer);
    this.updatedClicks.emit(this.totalClicks);
  }
}
