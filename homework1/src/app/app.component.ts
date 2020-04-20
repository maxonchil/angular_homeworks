import { UserService } from "./user.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public title = "Clicker";
  public playMode = false;
  public userName: string;

  constructor(private _userService: UserService) {}
  getUserName(name: string): void {
    let userName = name || "Anonymous";
    this._userService.setUser(userName);
    this.playMode = true;
  }
  onKeydownEnter(event: KeyboardEvent): void {
    let name = (<HTMLInputElement>event.target).value || "Anonymous";
    this._userService.setUser(name);
    this.playMode = true;
  }
}
