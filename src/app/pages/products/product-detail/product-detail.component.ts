import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  idProduct: string;
  product: any;
  fakePrice: number;
  indexPhoto: number;
  store: any;
  products = [];
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private cartService: CartService,
    private storesService: StoresService,
    private i18nServiceService: I18nServiceService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.idProduct = this.router.snapshot.params.id;
    this.indexPhoto = this.router.snapshot.params.indexPhoto;
    this.productService.getCurrentData(this.idProduct).subscribe((response) => {
      this.storesService.getCurrentData(response.store).subscribe(
        (data) => {
          this.store = data.name;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
      this.product = response;
      this.fakePrice = Number(this.product.price) + 1000;
      console.log(this.fakePrice);
    });
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
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
}
