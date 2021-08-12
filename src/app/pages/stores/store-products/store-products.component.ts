/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
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
  idStore: any;
  storeName: any;
  rating: any;
  reviews: any;
  constructor(private storesService: StoresService, public cartService: CartService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.idStore = '';
    this.idStore = this.router.snapshot.params.id;
    this.storesService.getCurrentData(this.idStore).subscribe(
      (data) => {
        this.storeName = data.name;
        this.rating = data.rating;
        this.products = data.products;
        this.reviews = data.reviews;
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

  getRatingArray(rating: any) {
    return [...Array(5 - Math.floor(Number(rating))).keys()];
  }

  getCheckedRatingArray(rating: any) {
    return [...Array(Math.floor(Number(rating))).keys()];
  }
  parseRating(rating: any) {
    return Math.floor(rating);
  }
}
