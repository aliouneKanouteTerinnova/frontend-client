import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthResponded } from 'src/app/models/auth/auth';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products = [];
  bestSelling = [];
  goodStuff = [];
  allCountries = ['EUROPE', 'AFRIQUE', 'ASIE', 'AMERIQUE', 'OCEANIE', 'OTHERS'];
  countries = [];
  left = false;
  right = true;
  firstIndex = 0;
  currentUser: AuthResponded;

  constructor(
    private authService: AuthenticationsService,
    private productsService: ProductsService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    this.firstIndex = this.firstIndex + 1;
    this.getProducts();
  }
  handleLeftClick() {
    if (this.firstIndex > 0) {
      this.left = true;
      this.right = true;
      this.firstIndex = this.firstIndex - 1;
      this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
    }
    if (this.firstIndex <= 0) {
      this.firstIndex = 1;
      this.left = false;
      this.right = true;
    }
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
  handleRightClick() {
    if (this.allCountries.length - this.firstIndex >= 3) {
      if (this.left && this.right) {
        this.firstIndex = this.firstIndex + 1;
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
      } else {
        this.countries = this.allCountries.slice(this.firstIndex, this.firstIndex + 3);
        this.firstIndex = this.firstIndex + 1;
      }
      this.left = true;
      this.right = true;

      if (this.allCountries.length - this.firstIndex <= 3) {
        this.firstIndex = this.allCountries.length - 3;
        this.left = true;
        this.right = false;
      }
    }
  }
  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
      this.products = this.products.slice(0, 15);
      console.log(this.products);
      this.bestSelling = this.products.slice(0, 5);
      this.goodStuff = this.products.slice(1, 8);
    });
  }
}
