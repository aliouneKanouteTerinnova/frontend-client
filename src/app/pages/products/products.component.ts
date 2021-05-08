import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products/products.service';
import { CategoriesService } from './../../services/categories/categories.service';
import { Products } from './../../models/products/products';
import { Category } from './../../models/category/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  categorys: Category;
  closeResult = '';
  ModalForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.ModalForm = this.fb.group({
      Category: ['', Validators.required],
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Image: ['', Validators.required],
    });

    this.getProducts();
    this.getCategory();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      console.log('Product', data);
      this.products = data;
    });
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('Category', data);
      this.categorys = data;
    });
  }

  get f() {
    return this.ModalForm.controls;
  }

  onSubmit() {
    this.submited = true;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addProduct() {
    this.submited = true;
    const products = new Products();

    products.id = Math.floor(Math.random() * 100);
    products.name = this.ModalForm.get('Name').value;
    products.get_absolute_url = '';
    products.description = this.ModalForm.get('Description').value;
    products.price = this.ModalForm.get('Price').value;
    // products.category = this.ModalForm.get('Category').value;
    products.category = 2;
    products.get_image = '';
    products.get_thumbnail = '';

    console.log(products);
    console.log(products.id);

    this.productsService.addProduct(products).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1600);

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
        setTimeout(() => {
          window.location.reload();
        }, 1600);
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

  // updateProducts(product) {
  //   console.log('The product has been updated!');
  // }
}
