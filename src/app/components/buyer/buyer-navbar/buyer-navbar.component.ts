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
  currentUser: AuthResponded;
  lang = '';
  changeLanguage = 'de';
  constructor(
    private authService: AuthenticationsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private i18nServiceService: I18nServiceService,
    public cartService: CartService,
    public signinDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      this.lang = 'ENGLISH–EN';
    } else if (this.i18nServiceService.currentLangValue === 'de') {
      this.lang = 'DEUTSH-DE';
    } else {
      this.lang = 'FRANCAIS-FR';
    }
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser != null) {
      this.authService.getUser(this.currentUser['user'].token).subscribe((data) => {
        // this.user = data.body;

        if (this.currentUser['user'].account_type === 'SELLER' || this.currentUser['user'].account_type === 'Seller') {
          this.isSeller = true;
        }
      });
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
      console.log(res.results);
      console.log(res.results[0].children);
      this.category = res.results;
    });
  }

  showCategory(data, id: number): void {
    this.subCategory = this.category[id].children;
    console.log(this.subCategory);
    this.imageSource = data.image;
    this.showImage = true;
  }

  changeImageCategory(data): void {
    this.imageSource = data.image;
  }

  oNCategoryDetails(data): void {
    console.log(data.id);
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
      this.lang = 'ENGLISH–EN';
    } else if (Number(event.target.value) === 2) {
      this.changeLanguage = 'de';
      this.lang = 'DEUTSH-DE';
    } else {
      this.changeLanguage = 'fr';
      this.lang = 'FRANCAIS-FR';
    }
    this.i18nServiceService.changeLocale(this.changeLanguage);
  }

  logout(): void {
    this.authService.logOut();
    window.location.reload();
  }
}
