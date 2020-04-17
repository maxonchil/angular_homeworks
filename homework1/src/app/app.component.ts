import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Clicker";
  playMode = false;
  userName: string;

  getUserName(name: string): void {
    if (!name) {
      name = "Anonymous";
    }
    this.userName = name;
    this.playMode = true;
  }
}
