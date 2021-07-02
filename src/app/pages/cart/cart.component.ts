import { Component, ViewChild, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart/cart';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  products = [];
  bestSelling = [];
  goodStuff = [];
  idProduct: any;
  quantity: any;

  constructor(
    public cartService: CartService,
    private productsService: ProductsService,
    private i18nServiceService: I18nServiceService
  ) {}

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });

    this.getProducts();
  }

  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
      this.products = this.products.slice(0, 15);
      this.bestSelling = this.products.slice(0, 5);
      this.goodStuff = this.products.slice(1, 8);
    });
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
  suppressionProduict(id) {
    this.idProduct = id;
    this.effacerSwal.fire();
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
  changeQuantity(e, c, index) {
    const quantity = Number(e.target.value);
    const temp = c.numInCart;
    if (quantity > c.product.quantity) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${c.product.quantity} article left`,
      });
      c.numInCart = c.product.quantity;
    } else if (quantity === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `You can have 0 article`,
      });
      c.numInCart = 1;
    } else {
      c.numInCart = quantity - 1;
      this.ChangeQuantity(index, true);
    }

    console.log(quantity, c);
  }
}
