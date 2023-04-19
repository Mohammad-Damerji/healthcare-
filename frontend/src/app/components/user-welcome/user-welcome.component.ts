import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent {

  constructor (private userSrv: UserService, private router: Router) {
    if (!userSrv.isLoggedIn()) {
      this.router.navigate([''])
    }
  }

}
