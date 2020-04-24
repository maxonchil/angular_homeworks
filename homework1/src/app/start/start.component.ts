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
    private router: Router,
    private gameConfigService: GameConfigService
  ) {}

  ngOnInit(): void {}

  public getUserName(name: string): void {
    this.saveUserName(name || "Anonymous");
  }

  public onKeydownEnter(event: KeyboardEvent): void {
    const name = (event.target as HTMLInputElement).value || "Anonymous";
    this.saveUserName(name);
  }

  private saveUserName(name: string): void {
    this.gameConfigService.setUserName(name);
    this.router.navigate(["/play"]);
  }
}
