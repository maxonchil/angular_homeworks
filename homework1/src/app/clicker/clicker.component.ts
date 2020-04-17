import { Component, OnInit, Input } from "@angular/core";
import { Score } from "../score";

@Component({
  selector: "app-clicker",
  templateUrl: "./clicker.component.html",
  styleUrls: ["./clicker.component.scss"],
})
export class ClickerComponent implements OnInit {
  @Input() userName: string;

  public state: string = "start";
  public timer: number = 10;
  public totalClicks: number = 0;
  public gameStart: boolean = false;
  public gameFinished: boolean = false;
  public highscores: object[] = JSON.parse(localStorage.getItem("hightscores")) || [];

  constructor() {}

  ngOnInit(): void {}

  launchTimer(): void {
    this.state = "click me";
    const timerInterval = setInterval(() => this.timer--, 1000);
    setTimeout(() => {
      clearInterval(timerInterval);
      this.finishGame();
    }, 10000);
    this.gameStart = true;
  }

  finishGame(): void {
    const score: Score = {
      clicks: this.totalClicks,
      name: this.userName,
      date: new Date().toUTCString(),
    };

    this.gameFinished = true;
    this.gameStart = false;
    this.highscores.push(score);
    localStorage.setItem("hightscores", JSON.stringify(this.highscores));
  }

  clickCounter(): void {
    if (this.timer > 0) {
      this.totalClicks++;
    }
  }

  startGame(): void {
    if (!this.gameStart) {
      this.launchTimer();
    } else {
      this.clickCounter();
    }
  }

  playAgain(): void {
    this.state = "start";
    this.timer = 10;
    this.totalClicks = 0;
    this.gameStart = false;
    this.gameFinished = false;
  }
}
