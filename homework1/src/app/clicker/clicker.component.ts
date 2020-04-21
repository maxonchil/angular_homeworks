import { ControllerClasses } from "./../controller-classes";
import { UserService } from "./../user.service";
import { GameControlService } from "./../game-control.service";
import { GameState } from "./../game-state";
import { ScaleControllerService } from "./../scale-controller.service";
import { Component, OnInit } from "@angular/core";
import { ControllerSize } from "../controller-size";
import { GameStateService } from "../game-state.service";

@Component({
  selector: "app-clicker",
  templateUrl: "./clicker.component.html",
  styleUrls: ["./clicker.component.scss"],
})
export class ClickerComponent implements OnInit {
  public timer: number = 10;
  public totalClicks: number = 0;
  public userName = this._userService.getUser();
  public breakpoints: number[] = [30, 60, 90, 120];
  public controlerSize: ControllerSize = this._scaleControllerService.getBreakPoints();
  public gameStates: GameState = this._gameStateService.getStates();

  constructor(
    private _scaleControllerService: ScaleControllerService,
    private _gameStateService: GameStateService,
    private _gameControlService: GameControlService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {}

  launchTimer(): void {
    this.gameStates.state = "click me";
    const timerInterval = setInterval(() => this.timer--, 1000);
    setTimeout(() => {
      clearInterval(timerInterval);
      this._gameControlService.finishGame(this.totalClicks);
    }, 10000);
    this.gameStates.gameStart = true;
  }

  clickCounter(): void {
    if (this.timer > 0) {
      this.totalClicks++;
    }
  }

  onControllerClick(): void {
    if (!this.gameStates.gameStart) {
      this.launchTimer();
    } else {
      this.clickCounter();
      if (this.breakpoints.includes(this.totalClicks)) {
        this._scaleControllerService.setBreakPoints(this.totalClicks);
      }
    }
  }
  getControllerClasses(): ControllerClasses {
    return {
      "clicker__controller--size-default": this.controlerSize.start,
      "clicker__controller--size-30": this.controlerSize.upper,
      "clicker__controller--size-60": this.controlerSize.advanced,
      "clicker__controller--size-90": this.controlerSize.pro,
      "clicker__controller--size-120": this.controlerSize.god,
      "clicker__controller--is-disabled": this.gameStates.gameFinished,
    };
  }
}
