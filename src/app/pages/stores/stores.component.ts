import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { StoresService } from 'src/app/services/stores/stores.service';
// import { Store } from './store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  stores: [];

  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private storesService: StoresService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.getStores();
  }

  getStores() {
    this.storesService.getAllStores().subscribe((res) => {
      console.log(res);
      this.stores = res.stores;
    });
  }

  deleteStore(id) {
    this.storesService.deleteStores(id, this.currentUser.user.token).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Store deleted with success',
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
