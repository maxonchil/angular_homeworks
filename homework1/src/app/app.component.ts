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
    if (!name) {
      name = "Anonymous";
    }
    this._userService.setUser(name);
    this.playMode = true;
  }
  onKeydownEnter(event: KeyboardEvent): void {
    let name = (<HTMLInputElement>event.target).value;
    if (!name) {
      name = "Anonymous";
    }
    this._userService.setUser(name);
    this.playMode = true;
  }
}
