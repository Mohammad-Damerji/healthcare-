import { Injectable } from '@angular/core';
import { ApiLogin } from './rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: ApiLogin | undefined
  private static USER_OBJ_KEY = "userObject"

  public getUser(): ApiLogin | undefined {
    const item = sessionStorage.getItem(UserService.USER_OBJ_KEY)
    if (item != null)
      return JSON.parse(item)     
    return undefined 
  }

  public setUser(user: ApiLogin) {
    const item = JSON.stringify(user)
    sessionStorage.setItem(UserService.USER_OBJ_KEY, item)
  }

  public isLoggedIn(): boolean {
    return this.getUser() != undefined
  }

  public logoutUser() {
    sessionStorage.removeItem(UserService.USER_OBJ_KEY)
  }

  constructor() { 
    this.currentUser = this.getUser()    
  }
}
