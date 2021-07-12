import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponded } from 'src/app/models/auth/auth';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.scss'],
})
export class ProductResultComponent implements OnInit {
  products = [];
  stores = [];
  categories = [];
  product: any;
  keyWord: any;
  isClicked = false;
  currentUser: AuthResponded;
  token: any;
  constructor(
    private authService: AuthenticationsService,
    private productsService: ProductsService,
    private i18nServiceService: I18nServiceService,
    private wishlistService: WishlistService,
    private router: ActivatedRoute,
    private route: Router,
    private categoryService: CategoriesService,
    private storeService: StoresService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.product = this.router.snapshot.params.keyword;
    this.searchProducts(this.product);
    this.getCategory();
    this.getStores();
  }
  searchProducts(keyWord: string) {
    this.productsService.searchProducts(keyWord).subscribe(
      (data) => {
        this.isClicked = false;
        this.products = data.results;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `An error occured`,
        });
      }
    );
  }
  searchProduct(keyWord: string) {
    this.searchProducts(keyWord);
    this.keyWord = keyWord;
    this.isClicked = true;
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.results.slice(0, 5);
    });
  }
  getStores() {
    this.storeService.getAllStores().subscribe(
      (res) => {
        this.stores = res.results.slice(0, 5);
        console.log(this.stores);
      },
      (error) => {
        console.log(error);
      }
    );
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
  AddWishlist(id: any) {
    if (!this.currentUser) {
      this.route.navigate(['/register']);
    }
    this.token = this.currentUser['user'].token;
    const products = {
      product: id,
    };
    this.wishlistService.AddToWishlist(products, this.token).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Product added to your Wishlist!',
          showConfirmButton: false,
          timer: 2000,
        });

        console.log(res);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.error,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
      }
    );
    console.log('wishlist added');
  }
}
