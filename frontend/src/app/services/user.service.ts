import { Injectable } from '@angular/core';
import { ApiLogin } from './rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: ApiLogin | undefined

  public getUser(): ApiLogin | undefined {
    const item = sessionStorage.getItem("userObject")
    if (item != null)
      return JSON.parse(item)     
    return undefined 
  }

  public setUser(user: ApiLogin) {
    const item = JSON.stringify(user)
    sessionStorage.setItem("userObject", item)
  }

  public isLoggedIn(): boolean {
    return this.getUser() != undefined
  }

  constructor() { 
    this.currentUser = this.getUser()    
  }
}
