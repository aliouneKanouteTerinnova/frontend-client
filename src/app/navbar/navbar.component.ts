import { MenuItem } from './../menu-item';
import { Component, OnInit } from '@angular/core';
import { I18nServiceService } from '../services/i18n-service/i18n-service.service';
import { CartService } from '../services/cart.service';
import { CartModelServer } from '../models/cart';
import { AuthenticationsService } from '../services/authentications.service';
import { AuthResponded } from '../models/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  lang = 'DE';
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
    this.currentUser = this.authService.currentUserValue;
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });
  }

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
