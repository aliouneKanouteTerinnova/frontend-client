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
  categoryTxt = [];
  storeTxt = [];
  isChecked = false;
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
    this.keyWord = this.product ? this.product : '';
    this.searchProducts(this.product);
    this.getCategory();
    this.getStores();
  }
  searchProducts(keyWord: string) {
    this.productsService.searchProducts(keyWord).subscribe(
      (data) => {
        this.isClicked = false;
        this.products = data.results;
        this.isChecked = this.products.length > 0 ? true : false;
        this.product = keyWord;
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
      this.categories = data.results;
    });
  }
  getStores() {
    this.storeService.getAllStores().subscribe(
      (res) => {
        this.stores = res.results;
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
  }

  filterCategory(e, category) {
    this.isChecked = true;
    let idCategory = e.target.value;
    let checked = e.target.checked;
    if (checked) {
      this.categoryTxt.push(category.id);
    } else {
      for (let i = 0; this.categoryTxt.length > i; i++) {
        if (this.categoryTxt[i] === idCategory) {
          this.categoryTxt.splice(i, 1);
        }
      }
    }
    this.productsService.searchProducts(this.product).subscribe(
      (data) => {
        let firstTab = [];
        let secondTab = [];
        this.isClicked = false;

        if (this.categoryTxt.length > 0) {
          this.categoryTxt.forEach((el) => {
            const table = data.results.filter(function (item) {
              return JSON.stringify(item).toLowerCase().includes(el);
            });
            firstTab = [...firstTab, ...table];
          });

          if (this.storeTxt.length > 0) {
            this.storeTxt.forEach((el) => {
              const table = firstTab.filter(function (item) {
                return JSON.stringify(item).toLowerCase().includes(el);
              });
              secondTab = [...secondTab, ...table];
            });
            firstTab = secondTab;
          } else {
            firstTab = firstTab;
          }
        } else if (this.storeTxt.length > 0) {
          this.filterShop(e, category);
        } else {
          firstTab = data.results;
        }
        this.products = firstTab;
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

  filterShop(e, store) {
    this.isChecked = true;
    let idStore = e.target.value;
    let checked = e.target.checked;
    if (checked) {
      this.storeTxt.push(store.id);
    } else {
      for (let i = 0; this.storeTxt.length > i; i++) {
        if (this.storeTxt[i] === idStore) {
          this.storeTxt.splice(i, 1);
        }
      }
    }
    this.productsService.searchProducts(this.product).subscribe(
      (data) => {
        let firstTab = [];
        let secondTab = [];
        this.isClicked = false;

        if (this.storeTxt.length > 0) {
          this.storeTxt.forEach((el) => {
            const table = data.results.filter(function (item) {
              return JSON.stringify(item).toLowerCase().includes(el);
            });
            firstTab = [...firstTab, ...table];
          });
          if (this.categoryTxt.length > 0) {
            this.categoryTxt.forEach((el) => {
              const table = firstTab.filter(function (item) {
                return JSON.stringify(item).toLowerCase().includes(el);
              });
              secondTab = [...secondTab, ...table];
            });
            firstTab = secondTab;
          } else {
            firstTab = firstTab;
          }
        } else if (this.categoryTxt.length > 0) {
          this.filterCategory(e, store);
        } else {
          firstTab = data.results;
        }
        this.products = firstTab;
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
}
