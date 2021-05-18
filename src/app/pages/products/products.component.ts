import { StoresService } from 'src/app/services/stores/stores.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products/products.service';
import { CategoriesService } from './../../services/categories/categories.service';
import { Category } from './../../models/category/category';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

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

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private storesService: StoresService
  ) {}

  ngOnInit(): void {
    this.getStores();
    this.getProducts();
    this.getCategory();
  }

  getStores() {
    this.storesService.getAllStores().subscribe((data) => {
      console.log(data);
      this.stores = data.stores;
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      console.log('Product', data);
      this.products = data.products;
    });
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('Category', data.categories);
      this.categorys = data.categories;
    });
  }

  onSubmit() {
    this.submited = true;
  }

  deleteProducts(id) {
    this.productsService.deleteProduct(id).subscribe(
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

  // updateProducts(product: Products) {
  //   console.log(product);
  //   this.productsService.updateProduct(product).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  //   console.log('The product has been updated!', product);
  // }
}
