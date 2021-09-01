import { WalletService } from './../../../services/wallet/wallet.service';
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountType } from 'src/app/enums/account-type.enum';
import { AuthResponded } from 'src/app/models/auth/auth';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { Store } from '../../../models/store/store';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  user: AuthResponded;
  is_seller = false;
  wallets = [];
  balance = 0;

  constructor(
    private authService: AuthenticationsService,
    private router: Router,
    private storesService: StoresService,
    private walletService: WalletService,
    private i18nServiceService: I18nServiceService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.authService.getUser(this.currentUser['user'].token).subscribe((data) => {
      this.user = data.body['user'];
      console.log(this.user);
      if (this.currentUser['user'].account_type === 'SELLER' || this.currentUser['user'].account_type === 'Seller') {
        this.is_seller = true;
      }
    });

    this.wallet();
  }

  wallet() {
    this.walletService.getWallet(this.currentUser['user'].token).subscribe((res) => {
      // console.log(res);
      this.wallets = res.body.funds;
      this.wallets.forEach((data) => {
        if (data.status === 'collected') {
          this.balance += +data.amount;
        }
      });
    });
  }

  formatPrice(price: any) {
    var prices = price.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
