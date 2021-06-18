import { ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { StoresService } from 'src/app/services/stores/stores.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products/products.service';
import { CategoriesService } from './../../services/categories/categories.service';
import { Category } from './../../models/category/category';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { CartService } from 'src/app/services/cart.service';
import { CartModelServer } from 'src/app/models/cart/cart';
import { Store } from '../stores/store';

uuidv4();

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  submited = false;
  products = [];
  stores: [];
  categorys: Category;
  closeResult = '';
  currentUser: any;
  cartData: CartModelServer;
  userType: string;
  disabledBtn = false;

  store: Store;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private storesService: StoresService,
    private authService: AuthenticationsService,
    private cartService: CartService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));
    this.getProducts();
    this.getCategory();
    this.getStore();

    console.log(this.currentUser.user.account_type);
    this.userType = this.currentUser.user.account_type;
    console.log('user type: ', this.userType);
    if (this.userType === 'CUSTOMER') {
      this.disabledBtn = true;
    }
  }

  getStore() {
    this.storesService.getAllStores().subscribe((data) => {
      console.log('Store', data);
      this.stores = data.results;
    });
    // return this.store.name;
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      console.log('Product', data);
      this.products = data.results;
    });
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('Category', data);
      this.categorys = data.results;
    });
  }

  onSubmit() {
    this.submited = true;
  }

  deleteProducts(id) {
    this.productsService.deleteProduct(id, this.currentUser.user.token).subscribe(
      (d) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The product has been deleted!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getProducts();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        console.log(err);
      }
    );

    console.log('The product has been deleted!');
  }

  addProducts(id) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
function id(id: any) {
  throw new Error('Function not implemented.');
}
