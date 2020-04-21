import { ClickerClasses } from "./../interfaces/clicker-classes";
import { Router } from "@angular/router";
import { GameOptions } from "./../interfaces/game-options";
import { GameConfigService } from "./../services/game-config.service";
import { Score } from "./../interfaces/score";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-clicker",
  templateUrl: "./clicker.component.html",
  styleUrls: ["./clicker.component.scss"],
})
export class ClickerComponent implements OnInit {
  public gameOptions: GameOptions;

  constructor(
    private _gameConfigService: GameConfigService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.gameOptions = this._gameConfigService.getGameOptions();
  }

  onControllerClick(): void {
    if (!this.gameOptions.gameState) {
      this.launchTimer();
    } else {
      this.clickCounter();
    }
  }

  launchTimer(): void {
    this._gameConfigService.startGame();
    const timerInterval = setInterval(() => this.gameOptions.timer--, 1000);
    setTimeout(() => {
      clearInterval(timerInterval);
      this.finishGame();
    }, 10000);
  }

  clickCounter(): void {
    if (this.gameOptions.timer > 0) {
      this.gameOptions.totalClicks++;
    }
  }

  finishGame(): void {
    const score: Score = {
      clicks: this.gameOptions.totalClicks,
      name: this.gameOptions.userName,
      date: new Date().toUTCString(),
    };
    this._gameConfigService.finishGame(score);
    this._router.navigate(["/finish"]);
  }

  getClickerClasses(): ClickerClasses {
    return {
      clicker__controller: !this.gameOptions.gameState,
      "clicker__controller--is-green": this.gameOptions.gameState,
    };
  }
}
