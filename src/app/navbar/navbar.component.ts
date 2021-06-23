import { MenuItem } from './../menu-item';
import { Component, OnInit } from '@angular/core';
import { I18nServiceService } from '../services/i18n-service/i18n-service.service';
import { CartService } from '../services/cart/cart.service';
import { CartModelServer } from '../models/cart/cart';
import { AuthResponded } from '../models/auth/auth';
import { AuthenticationsService } from '../services/authentications/authentications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  lang: string = '';
  changeLanguage = 'de';
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  currentUser: AuthResponded;

  constructor(
    public cartService: CartService,
    private authService: AuthenticationsService,
    private i18nServiceService: I18nServiceService
  ) {}

  ngOnInit(): void {
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      this.lang = 'DE';
    } else {
      this.lang = 'EN';
    }
    this.currentUser = this.authService.currentUserValue;
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });
  }

  changeLang() {
    if (this.i18nServiceService.currentLangValue === 'en') {
      this.changeLanguage = 'de';
      this.lang = 'EN';
    } else {
      this.changeLanguage = 'en';
      this.lang = 'DE';
    }
    this.i18nServiceService.changeLocale(this.changeLanguage);
  }
}
