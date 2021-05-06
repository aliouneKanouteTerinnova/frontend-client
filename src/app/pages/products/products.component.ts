import { Component, OnInit } from '@angular/core';

import { products } from './products';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  submited = false;
  products = products;
  closeResult = '';
  ModalForm: FormGroup;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ModalForm = this.fb.group({
      Category: ['', Validators.required],
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Image: ['', Validators.required],
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

  share() {
    window.alert('The product has been shared!');
  }

  view() {
    window.alert('The product has been viewed!');
  }

  addProduct(Category, Name, Description, Price) {
    Category = this.ModalForm.get('Category').value;
    Name = this.ModalForm.get('Name').value;
    Description = this.ModalForm.get('Description').value;
    Price = this.ModalForm.get('Price').value;
    Image = this.ModalForm.get('Image').value;
    console.log(Category, Name, Description, Price);
    console.log('Add Product');
  }
}
