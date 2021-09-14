/* eslint-disable @typescript-eslint/no-unsafe-call */
import { window } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { timer } from 'rxjs';

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
  showSpinner = true;

  constructor(
    private authService: AuthenticationsService,
    private router: Router,
    private storesService: StoresService,
    private walletService: WalletService,
    private i18nServiceService: I18nServiceService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.authService.currentUserValue;

    if (this.currentUser) {
      const res: any = await this.authService
        .getUser(this.currentUser.token || this.currentUser['user'].token)
        .toPromise();
      console.log(res);
      this.user = res.body['user'];
      this.router.navigate(['/profile']);
      if (res) {
        this.showSpinner = false;
        // window.location.reload();
      }

      if (
        this.currentUser.account_type ||
        this.currentUser['user'].account_type === 'SELLER' ||
        this.currentUser.account_type ||
        this.currentUser['user'].account_type === 'Seller'
      ) {
        this.is_seller = true;
      }
    } else {
      this.router.navigate(['/register']);
    }

    this.wallet();
  }

  wallet() {
    this.walletService.getWallet(this.currentUser.token || this.currentUser['user'].token).subscribe((res) => {
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
