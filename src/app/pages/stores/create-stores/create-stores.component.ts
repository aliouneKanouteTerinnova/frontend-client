import { Router } from '@angular/router';
import { Store } from './../store';
import { StoresService } from 'src/app/services/stores/stores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthenticationsService } from 'src/app/services/authentications.service';

@Component({
  selector: 'app-create-stores',
  templateUrl: './create-stores.component.html',
  styleUrls: ['./create-stores.component.scss'],
})
export class CreateStoresComponent implements OnInit {
  createStore: FormGroup;
  submited = false;
  currentUser: any;
  constructor(
    private fb: FormBuilder,
    private storesService: StoresService,
    private route: Router,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.createStore = this.fb.group({
      name: ['', Validators.required],
      created_at: [''],
      created_by: [''],
      store_address: ['', Validators.required],
    });
  }

  get f() {
    return this.createStore.controls;
  }

  onSubmit() {
    this.submited = true;
    const data = new Store();

    data.name = this.createStore.get('name').value;
    data.created_at = '';
    data.created_by = 2;
    data.store_address = this.createStore.get('store_address').value;
    data.is_active = true;

    console.log(data);

    this.storesService.createStores(data, this.currentUser.user.token).subscribe(
      (res) => {
        console.log(res);
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
          text: 'Something went wrong!',
        });
        console.log(err);
      }
    );
  }
}
