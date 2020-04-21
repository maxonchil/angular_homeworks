import { GameConfigService } from "./../services/game-config.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"],
})
export class StartComponent implements OnInit {
  constructor(
    private _router: Router,
    private _gameConfigService: GameConfigService
  ) {}

  ngOnInit(): void {}
  
  getUserName(name: string): void {
    const userName = name || "Anonymous";
    this._gameConfigService.setUserName(userName);
    this._router.navigate(["/play"]);
  }
  onKeydownEnter(event: KeyboardEvent): void {
    const name = (<HTMLInputElement>event.target).value || "Anonymous";
    this._gameConfigService.setUserName(name);
    this._router.navigate(["/play"]);
  }
}
