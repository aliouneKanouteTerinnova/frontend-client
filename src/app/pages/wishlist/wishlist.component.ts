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
    private wishlistService: WishlistService
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
          console.log(res);
          this.wishlists.push(res);
        });
      });
      console.log(data);
    });
  }

  removeWishlist(id: any) {
    this.wishlistService.deletWishlist(id, this.token).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
