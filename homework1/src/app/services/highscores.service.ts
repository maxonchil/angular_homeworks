import { Score } from "./../interfaces/score";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HighScoresService {
  private highScores: Score[];

  constructor() {
    this.highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  }


  public setScore(score: Score) {
    this.highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(this.highScores));
  }
  public getScores(): Score[] {
    return this.highScores.sort((a: Score, b: Score) => b.clicks - a.clicks);
  }
}
