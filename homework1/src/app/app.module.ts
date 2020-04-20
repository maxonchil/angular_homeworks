import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickerComponent } from './clicker/clicker.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { PlayAgainComponent } from './play-again/play-again.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickerComponent,
    HighscoresComponent,
    PlayAgainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
