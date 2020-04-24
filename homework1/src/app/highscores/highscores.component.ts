import { HighscoresService } from "./../highscores.service";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-highscores",
  templateUrl: "./highscores.component.html",
  styleUrls: ["./highscores.component.scss"],
})
export class HighscoresComponent implements OnInit {
  public showScores: boolean = false;
  public hightscores: object[];

  constructor(public _highscoresService: HighscoresService) {}

  ngOnInit(): void {}

  getAllScores(): void {
    this.showScores = !this.showScores;
    this.hightscores = this._highscoresService.getScores();
  }
}
