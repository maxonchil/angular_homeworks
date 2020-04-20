import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user: string;
  constructor() {}
  setUser(name: string): void {
    this.user = name;
  }
  getUser(): string {
    return this.user;
  }
}
