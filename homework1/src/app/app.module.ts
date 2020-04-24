import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClickerComponent } from "./clicker/clicker.component";
<<<<<<< HEAD
=======
import { StartComponent } from "./start/start.component";
>>>>>>> a368a584... Refactored homework 1 using routing and services by task of homework2
import { FinishGameComponent } from "./finish-game/finish-game.component";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
<<<<<<< HEAD
=======
    StartComponent,
>>>>>>> a368a584... Refactored homework 1 using routing and services by task of homework2
    FinishGameComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
