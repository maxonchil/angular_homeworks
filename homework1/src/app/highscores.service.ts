import { Score } from "./score";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HighscoresService {
  public highscores: object[] =
    JSON.parse(localStorage.getItem("hightscores")) || [];

  constructor() {}

  setScore(score: Score) {
    this.highscores.push(score);
    localStorage.setItem("hightscores", JSON.stringify(this.highscores));
  }
  getScores(): object[] {
    return this.highscores.sort((a: any, b: any) => b.clicks - a.clicks);
  }
}
