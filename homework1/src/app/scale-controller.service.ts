import { Injectable } from "@angular/core";
import { ControllerSize } from "./controller-size";

@Injectable({
  providedIn: "root",
})
export class ScaleControllerService {
  public controlerSize: ControllerSize = {
    start: true,
    upper: false,
    advanced: false,
    pro: false,
    god: false,
  };

  constructor() {}
  getBreakPoints(): ControllerSize {
    return this.controlerSize;
  }

  setBreakPoints(totalClicks: number): ControllerSize {
    switch (totalClicks) {
      case 0:
        this.controlerSize.start = true;
        this.controlerSize.upper = false;
        this.controlerSize.advanced = false;
        this.controlerSize.pro = false;
        this.controlerSize.god = false;
        return this.controlerSize;
      case 30:
        this.controlerSize.start = false;
        this.controlerSize.upper = true;
        return this.controlerSize;
      case 60:
        this.controlerSize.upper = false;
        this.controlerSize.advanced = true;
        return this.controlerSize;
      case 90:
        this.controlerSize.advanced = false;
        this.controlerSize.pro = true;
        return this.controlerSize;
      case 120:
        this.controlerSize.pro = false;
        this.controlerSize.god = true;
        return this.controlerSize;
      default:
        return this.controlerSize;
    }
  }
 
}
