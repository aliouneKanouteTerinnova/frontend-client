import { MenuItem } from './../menu-item';
import { Component, OnInit } from '@angular/core';
import { I18nServiceService } from '../services/i18n-service/i18n-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  lang = 'DE';
  changeLanguage = 'de';

  constructor(private i18nServiceService: I18nServiceService) {}

  ngOnInit(): void {}
  changeLang() {
    if (this.lang === 'EN') {
      this.changeLanguage = 'en';
      this.lang = 'DE';
    } else {
      this.changeLanguage = 'de';
      this.lang = 'EN';
    }
    this.i18nServiceService.changeLocale(this.changeLanguage);
  }
}
