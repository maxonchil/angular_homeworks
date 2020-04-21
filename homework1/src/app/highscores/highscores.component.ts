import { Score } from "./../interfaces/score";
import { HighScoresService } from "../services/highscores.service";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-highscores",
  templateUrl: "./highscores.component.html",
  styleUrls: ["./highscores.component.scss"],
})
export class HighScoresComponent implements OnInit {
  public showScores = false;
  public highScores: Score[];

  constructor(public highScoresService: HighScoresService) {}

  ngOnInit(): void {}

  getAllScores(): void {
    this.showScores = !this.showScores;
    this.highScores = this.highScoresService.getScores();
  }
}
