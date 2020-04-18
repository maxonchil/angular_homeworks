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
  public highscores: object[] =
    JSON.parse(localStorage.getItem("hightscores")) || [];
  public breakpoints: number[] = [30, 60, 90, 120];
  public controlerSize: any = {
    start: true,
    upper: false,
    advanced: false,
    pro: false,
    god: false,
  };

  constructor() {}

  ngOnInit(): void {}

  scaleController(): void {
    switch (this.totalClicks) {
      case 30:
        this.controlerSize.default = false;
        this.controlerSize.upper = true;
        break;  
      case 60:
        this.controlerSize.upper = false;
        this.controlerSize.advanced = true;
        break;
      case 90:
        this.controlerSize.advanced = false;
        this.controlerSize.pro = true;
        break;
      case 120:
        this.controlerSize.pro = false;
        this.controlerSize.god = true;
        break;
    }
  }

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
      if (this.breakpoints.includes(this.totalClicks)) {
        this.scaleController();
      }
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
