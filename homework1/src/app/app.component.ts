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

  getUserName(name: string): void {
    if (!name) {
      name = "Anonymous";
    }
    this.userName = name;
    this.playMode = true;
  }
  onKeydownEnter({ target }) {
    let name = target.value;
    if (!name) {
      name = "Anonymous";
    }
    this.userName = name;
    this.playMode = true;
  }
}
