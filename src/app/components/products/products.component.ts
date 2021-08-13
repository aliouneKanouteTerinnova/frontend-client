import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() products: any[];
  constructor(private i18nServiceService: I18nServiceService, private cartService: CartService) {}

  ngOnInit(): void {}
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
      // position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
