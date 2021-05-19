import { Router } from '@angular/router';
import { ProductsService } from './../../../services/products/products.service';
import { Products } from './../../../models/products/products';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup;
  categorys: Category;
  stores: [];
  products = [];
  token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjIxNTEzMTk4fQ.u_Mf7IhHTOwy6HlvwocG3IT6eBVjt6JGhegUP1qJiGk';
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private storesService: StoresService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      // store: ['', Validators.required],
    });

    this.getProducts();
    this.getCategory();
    this.getStores();
  }
  checkCheckBoxvalue(event) {
    console.log(event.checked);
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

  getStores() {
    this.storesService.getAllStores().subscribe((res) => {
      console.log(res);
      this.stores = res.stores;
    });
  }

  onSubmit() {
    console.log('submited');

    const products = new Products();

    products.id = Math.floor(Math.random() * 100);
    products.name = this.createProductForm.get('name').value;
    products.slug = this.createProductForm.get('slug').value;
    products.description = this.createProductForm.get('description').value;
    products.price = this.createProductForm.get('price').value;
    products.date_added = '';
    products.created_by = '';
    products.is_active = true;
    products.quantity = this.createProductForm.get('quantity').value;
    products.category = 2;
    products.store = 1;

    console.log(products);

    this.productsService.addProduct(products, this.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/products']);
        this.getProducts();

        console.log(res);
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
  }
}
