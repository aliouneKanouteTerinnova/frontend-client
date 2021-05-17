import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, AuthResponded } from './models/auth';
import { AuthenticationsService } from './services/authentications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationsService, private router: Router) {}

  ngOnInit() {}

  goLogin() {
    void this.router.navigate(['/register']);
  }
}
