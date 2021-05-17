import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoresService } from 'src/app/services/stores/stores.service';
import { Store } from './store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  stores: [];
  // createStore: FormGroup;
  submited = false;
  token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjIxMzQxMDg4fQ.o6ypxFQZGa6SMBUwEF2Bjx_mvBmcEjGKaSI4iJzsJPE';

  constructor(private fb: FormBuilder, private storesService: StoresService) {}

  ngOnInit(): void {
    // this.createStore = this.fb.group({
    //   name: ['', Validators.required],
    //   created_at: [''],
    //   created_by: [''],
    //   store_address: ['', Validators.required],
    // });

    this.getStores();
  }

  // get f() {
  //   return this.createStore.controls;
  // }

  // onSubmit() {
  //   this.submited = true;
  //   const data = new Store();

  //   data.name = this.createStore.get('name').value;
  //   data.created_at = this.createStore.get('created_at').value;
  //   data.created_by = this.createStore.get('created_by').value;
  //   data.store_address = this.createStore.get('store_address').value;

  //   console.log(data);

  //   this.storesService.createStores(data, this.token).subscribe(
  //     (res) => {
  //       console.log(res);
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Product modified',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       this.getStores();
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

  getStores() {
    this.storesService.getAllStores().subscribe((res) => {
      console.log(res);
      this.stores = res.stores;
    });
  }

  deleteStore(id) {
    this.storesService.deleteStores(id, this.token).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product modified',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getStores();
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
    console.log('delete clicked ', id);
  }
}
