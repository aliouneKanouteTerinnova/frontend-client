/* eslint-disable @typescript-eslint/no-floating-promises */

import { Router } from '@angular/router';
import { User } from './models/user';
import { Auth, AuthResponded } from './models/auth';
import { AuthenticationsService } from './services/authentications.service';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
// export class AppComponent {
//   title = 'frontend-client';

//   nombre = [1, 2, 3, 4, 4];
export class AppComponent implements OnInit {
  currentUser: any;
  isLoggedin = true;
  constructor(private authService: AuthenticationsService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
  goLogin() {
    void this.router.navigate(['/register']);
  }

  logOut() {
    this.authService.logOut();
    location.reload();
  }

  isLoggedIn() {
    if (this.currentUser == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    } else {
      return true;
    }
  }

  logIn() {
    void this.router.navigate(['/register']);
  }
}
