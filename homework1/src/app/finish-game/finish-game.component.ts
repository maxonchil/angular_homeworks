import { Router } from "@angular/router";
import { Score } from "./../interfaces/score";
import { HighScoresService } from "./../services/highscores.service";
import { GameOptions } from "./../interfaces/game-options";
import { GameConfigService } from "./../services/game-config.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-finish-game",
  templateUrl: "./finish-game.component.html",
  styleUrls: ["./finish-game.component.scss"],
})
export class FinishGameComponent implements OnInit, OnDestroy {
  public gameOptions: GameOptions;
  public showScores = false;
  public highScores: Score[];

  constructor(
    private gameConfigService: GameConfigService,
    private highScoresService: HighScoresService,
    private router: Router
  ) {
    this.gameOptions = this.gameConfigService.getGameOptions();
  }

  ngOnInit(): void {}

  public getAllScores(): void {
    this.showScores = !this.showScores;
    this.highScores = this.highScoresService.getScores();
    console.log(this.highScores);
  }
  public playAgain(): void {
    this.gameConfigService.playAgain();
    this.router.navigate(["/play"]);
  }
  ngOnDestroy(): void {
    this.gameConfigService.playAgain();
  }
}
