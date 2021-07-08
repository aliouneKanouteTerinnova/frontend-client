import { Router } from '@angular/router';
import { Store } from './../store';
import { StoresService } from 'src/app/services/stores/stores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-create-stores',
  templateUrl: './create-stores.component.html',
  styleUrls: ['./create-stores.component.scss'],
})
export class CreateStoresComponent implements OnInit {
  createStore: FormGroup;
  submited = false;
  currentUser: any;

  image: any;
  constructor(
    private fb: FormBuilder,
    private storesService: StoresService,
    private route: Router,
    private productsService: ProductsService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.createStore = this.fb.group({
      name: ['', Validators.required],
      created_at: [''],
      created_by: [''],
      store_address: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  get f() {
    return this.createStore.controls;
  }

  onSubmit() {
    this.submited = true;
    const data = new Store();

    data.name = this.createStore.get('name').value;

    // data.created_by = this.currentUser.user.id;
    data.store_address = this.createStore.get('store_address').value;
    data.is_active = true;
    data.products = [];
    data.image = this.image;

    this.storesService.createStores(data, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Store created',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/list-store']);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error,
        });
      }
    );
  }

  handleFileInput(event) {
    const file = <File>event.target.files[0];
    // for (let file of files) {
    let fileName = file.name;
    if (file.size > 10485760) {
      return false;
    }
    if (fileName) {
      fileName = fileName.replace(/[^a-zA-Z0-9\.\-]/g, '_');
    }

    let fd = new FormData();
    fd.append('file', file);
    console.log(fd);
    this.productsService.uploadFile(fd, this.currentUser.user.token).subscribe(
      (data) => {
        this.image = data.body.file;
        console.log(data.body.file);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
