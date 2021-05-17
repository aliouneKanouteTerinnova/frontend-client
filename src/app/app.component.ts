/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { Auth, AuthResponded } from './models/auth';
import { AuthenticationsService } from './services/authentications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
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
    location.reload();
  }
}
