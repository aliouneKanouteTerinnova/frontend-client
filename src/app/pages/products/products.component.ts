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
      store: ['', Validators.required],
      category: ['', Validators.required],
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      date_added: ['', Validators.required],
      created_by: ['', Validators.required],
      // last_updated: ['', Validators.required],
      quantity: ['', Validators.required],
      is_active: ['', Validators.required],
    });

    this.getProducts();
    this.getCategory();
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

  get f() {
    return this.ModalForm.controls;
  }

  onSubmit() {
    this.submited = true;
  }

  // open(content) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     }
  //   );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  // addProduct() {
  //   this.submited = true;
  //   const products = new Products();

  //   products.id = Math.floor(Math.random() * 100);
  //   products.name = this.ModalForm.get('name').value;
  //   products.slug = this.ModalForm.get('slug').value;
  //   products.store = this.ModalForm.get('store').value;
  //   products.description = this.ModalForm.get('description').value;
  //   products.price = this.ModalForm.get('price').value;
  //   products.date_added = '';
  //   // products.created_by
  //   products.quantity = this.ModalForm.get('quantity').value;
  //   products.is_active = this.ModalForm.get('is_active').value;

  //   console.log(products);
  //   console.log(products.id);

  //   this.productsService.addProduct(products).subscribe(
  //     (res) => {
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Your work has been saved',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       this.getProducts();
  //       this.modalService.dismissAll();

  //       console.log(res);
  //     },
  //     (err) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: 'Something went wrong!',
  //       });
  //       console.log(err);
  //     }
  //   );
  // }

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
