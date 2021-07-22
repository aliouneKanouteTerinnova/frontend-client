/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.scss'],
})
export class StoreProductsComponent implements OnInit {
  products = [];
  produits1 = [];
  produits2 = [];
  idStore: any;
  constructor(
    private storesService: StoresService,
    public cartService: CartService,
    private router: ActivatedRoute,
    private i18nServiceService: I18nServiceService
  ) {}

  ngOnInit(): void {
    this.idStore = this.router.snapshot.params.id;
    this.storesService.getCurrentData(this.idStore).subscribe(
      (data) => {
        this.products = data.products;
        this.produits1 = this.products.slice(0, 2);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error,
          text: 'Something went wrong!',
        });
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

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Quantity not available!',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
