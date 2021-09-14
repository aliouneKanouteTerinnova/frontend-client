/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-types */
import { I18nServiceService } from './../../../services/i18n-service/i18n-service.service';
import { AuthResponded } from './../../../models/auth/auth';
import { CartService } from './../../../services/cart/cart.service';
import { CartModelServer } from './../../../models/cart/cart';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from 'src/app/pages/components/signup/signup.component';

@Component({
  selector: 'app-buyer-navbar',
  templateUrl: './buyer-navbar.component.html',
  styleUrls: ['./buyer-navbar.component.scss'],
})
export class BuyerNavbarComponent implements OnInit {
  categoryParents = [];
  category = [];
  subCategory: string;
  categoryProdact: [] = [];
  imageSource: string;
  showImage = false;
  cartData: CartModelServer;
  totalProduct: Number;
  total = 0;
  cartTotal: Number;
  isSeller = false;
  currentUser: any;
  lang = '';
  changeLanguage = 'de';
  user: any;
  constructor(
    private authService: AuthenticationsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private i18nServiceService: I18nServiceService,
    public cartService: CartService,
    public signinDialog: MatDialog
  ) {}

  async ngOnInit() {
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      this.lang = '🇺🇸';
    } else if (this.i18nServiceService.currentLangValue === 'de') {
      this.lang = '🇩🇪';
    } else {
      this.lang = '🇫🇷';
    }

    this.currentUser = await this.authService.currentUserValue;
    console.log(this.currentUser);
    if (this.currentUser) {
      const res: any = await this.authService
        .getUser(this.currentUser.token || this.currentUser['user'].token)
        .toPromise();
      console.log(res);
      this.user = res.body['user'].username;
      // localStorage.setItem('currentUser', JSON.stringify(res.body['user']));

      if (
        this.currentUser.account_type ||
        this.currentUser['user'].account_type === 'SELLER' ||
        this.currentUser.account_type ||
        this.currentUser['user'].account_type === 'Seller'
      ) {
        this.isSeller = true;
      }
    }

    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
      for (let inded of this.cartData.data) {
        this.total += inded.numInCart;
      }
    });

    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.cartService.productTotal$.subscribe((totalProduct) => {
      this.totalProduct = totalProduct;
    });

    this.getCategory();
  }

  openDialog(): void {
    const dialogRef = this.signinDialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe((result) => console.log('dialog closed |' + result.toString()));
  }

  getCategory(): void {
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.category = res.results;

      this.categoryParents = this.category.filter((category) => category.parent === null);
    });
  }

  showCategory(data, id: number): void {
    this.subCategory = this.categoryParents[id].children;
    // this.imageSource = data.image;
    // this.showImage = true;
  }

  changeImageCategory(data): void {
    this.imageSource = data.image;
    this.showImage = true;
  }

  oNCategoryDetails(data): void {
    // console.log(data.id);
  }

  searchProducts(keyWord: string) {
    if (keyWord) {
      this.router.navigate([`product/${keyWord}`]);
    } else {
      return;
    }
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

  filterOrder(event) {
    if (Number(event.target.value) === 1) {
      this.changeLanguage = 'en';
      this.lang = 'en';
    } else if (Number(event.target.value) === 2) {
      this.changeLanguage = 'de';
      this.lang = 'de';
    } else {
      this.changeLanguage = 'fr';
      this.lang = 'fr';
    }
    this.i18nServiceService.changeLocale(this.changeLanguage);
  }

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/home']);
    window.location.reload();
  }
}
