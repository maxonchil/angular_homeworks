import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClickerComponent } from "./clicker/clicker.component";

import { FinishGameComponent } from "./finish-game/finish-game.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
    FinishGameComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
