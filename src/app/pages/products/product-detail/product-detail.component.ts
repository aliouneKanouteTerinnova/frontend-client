import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { ProductsService } from 'src/app/services/products/products.service';
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
  products = [];
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private cartService: CartService,
    private i18nServiceService: I18nServiceService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.idProduct = this.router.snapshot.params.id;
    this.indexPhoto = this.router.snapshot.params.indexPhoto;
    this.productService.getCurrentData(this.idProduct).subscribe((response) => {
      // const product = JSON.stringify(response);
      this.product = response;
      this.fakePrice = Number(this.product.price) + 1000;
      console.log(this.fakePrice);
    });
    this.getProducts();
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      // position: 'top-end',
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

  getProducts() {
    this.productsService.getAllProducts().subscribe(
      (data) => {
        this.products = data.results.slice(0, 6);
        console.log(data.results);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
}
