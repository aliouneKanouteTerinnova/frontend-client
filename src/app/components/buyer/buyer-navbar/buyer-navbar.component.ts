import { AuthResponded } from './../../../models/auth/auth';
import { CartService } from './../../../services/cart/cart.service';
import { CartModelServer } from './../../../models/cart/cart';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { Component, OnInit } from '@angular/core';

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
  countries = [{ icon: '/assets/img/lang/United_Kingdom.svg' }, { icon: '/assets/img/lang/United_Kingdom.svg' }];
  constructor(
    private authService: AuthenticationsService,
    private categoriesService: CategoriesService,
    private router: Router,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
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

  logout(): void {
    this.authService.logOut();
    window.location.reload();
  }
}
