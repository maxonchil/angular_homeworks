import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-highscores",
  templateUrl: "./highscores.component.html",
  styleUrls: ["./highscores.component.scss"],
})
export class HighscoresComponent implements OnInit {
  public showScores: boolean = false;
  public hightscores: object[];
  
  constructor() {}

  ngOnInit(): void {}

  getScores(): void {
    this.hightscores = JSON.parse(localStorage.getItem("hightscores"));
    this.showScores = !this.showScores;
  }
}
