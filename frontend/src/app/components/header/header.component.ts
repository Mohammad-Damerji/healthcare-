import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  currentUser(): string {
    const user = this.userSrv.getUser()
    if (user) {
      return user.username
    }
    else {
      return ""
    }
  }

  constructor (public userSrv: UserService) {}

  logoutUser() {
    this.userSrv.logoutUser()
  }

  isLoggedIn() {
    return this.userSrv.isLoggedIn()
  }

}


