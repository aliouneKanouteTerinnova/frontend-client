import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
      console.log('first cartData', this.cartData);
    });
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
      console.log('first cartTotal', this.cartTotal);
    });
    console.log('second cartData', this.cartData);
    console.log('second cartTotal', this.cartTotal);
  }

  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }
}
