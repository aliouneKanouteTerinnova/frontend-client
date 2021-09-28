import { I18nServiceService } from './../../../../services/i18n-service/i18n-service.service';
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent implements OnInit {
  @Input() welcome;
  @Input() infos;
  constructor(
    private authService: AuthenticationsService,
    private router: Router,
    private i18nServiceService: I18nServiceService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/register']);
    window.location.reload();
  }
}
