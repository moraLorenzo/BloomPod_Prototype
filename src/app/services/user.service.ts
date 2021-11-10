import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiLink: string = 'http://localhost/bloompod_api/';

  public name: string;
  private token: string;
  private email: string;
  private userId: string;
  private isLoggedIn: boolean = false;

  user_obj: any;

  constructor() {}

  getToken(): string {
    return this.token;
  }
  getFullname(): string {
    this.name = this.user_obj.user_fullname;
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }
  getUserID(): string {
    // this.userId = this.user_obj.user_id;
    return this.userId;
  }
  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
  setUserLoggedIn(name: string, token: string, id: string): void {
    this.isLoggedIn = true;
    this.name = name;
    this.token = token;
    this.userId = id;
  }
  setUserLoggedOut(): void {
    this.isLoggedIn = false;
  }

  setUser(user_obj: any) {
    this.user_obj = user_obj;
  }

  getUser() {
    return this.user_obj;
  }

  genHexString(len) {
    const hex = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < len; ++i) {
      output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
  }
}
