/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationsService } from './services/authentications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-client';
  nombre = [1, 2, 3, 4, 4];
  constructor(private authService: AuthenticationsService, private router: Router) {}

  goRegister() {
    this.router.navigate(['/register']);
  }
}
