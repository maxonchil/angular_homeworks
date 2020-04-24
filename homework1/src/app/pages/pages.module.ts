import { StartComponent } from "./../start/start.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
  declarations: [StartComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
