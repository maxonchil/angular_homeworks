import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickerComponent } from './clicker/clicker.component';
import { HighScoresComponent } from './highscores/highscores.component';
import { StartComponent } from './start/start.component';
import { FinishGameComponent } from './finish-game/finish-game.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
    HighScoresComponent,
    StartComponent,
    FinishGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
