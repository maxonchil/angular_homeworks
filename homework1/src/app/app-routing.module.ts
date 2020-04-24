
import { NotFoundComponent } from "./not-found/not-found.component";
import { FinishGameComponent } from "./finish-game/finish-game.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClickerComponent } from "./clicker/clicker.component";

const routes: Routes = [

  {
    path: "",
    loadChildren: () =>
      import("./pages/pages.module").then((mod) => mod.PagesModule),
  },
  { path: "play", component: ClickerComponent },
  {
    path: "finish",
    component: FinishGameComponent,
  },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
