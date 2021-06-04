import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponded } from 'src/app/models/auth';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { ProductsService } from 'src/app/services/products/products.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.router.url);
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser);
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
      console.log('Product', data);
      this.products = data.products;
      this.products = this.products.slice(0, 15);
      this.bestSelling = this.products.slice(0, 5);
      this.goodStuff = this.products.slice(3, 8);
    });
  }
}
