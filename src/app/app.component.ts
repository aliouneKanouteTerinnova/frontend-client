import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './models/auth';
import { AuthenticationsService } from './services/authentications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthenticationsService, private router: Router) {}

  goLogin() {
    void this.router.navigate(['/register']);
  }
}
