/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { Component, OnInit } from '@angular/core';
import { AuthResponded } from 'src/app/models/auth/auth';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  currentUser: AuthResponded;
  token;
  wishlists = [];
  items;

  constructor(
    private productsService: ProductsService,
    private authService: AuthenticationsService,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.token = this.currentUser['user'].token;

    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getAllWishlist(this.token).subscribe((data) => {
      this.items = data.body.items;
      this.items.forEach((element) => {
        this.productsService.getCurrentData(element.product).subscribe((res) => {
          const item = {
            item: element.id,
            product: res,
          };
          this.wishlists.push(item);
        });
      });
    });
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

  removeWishlist(id: any) {
    this.wishlistService.deletWishlist(id, this.token).subscribe(
      (res) => {
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Items removed to your Wishlist!',
          showConfirmButton: false,
          timer: 2000,
        });
        this.wishlists = res.body.items;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
