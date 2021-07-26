import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
// import { Store } from './store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  @ViewChild('effacerSwal', { static: false })
  private effacerSwal: SwalComponent;
  stores = [];
  storeId: any;
  currentUser: any;
  userType: string;
  disabledBtn = false;

  constructor(
    private fb: FormBuilder,
    private storesService: StoresService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.getStores();

    this.userType = this.currentUser.user.account_type;
    if (this.userType === 'CUSTOMER') {
      this.disabledBtn = true;
    }
  }

  getStores() {
    this.storesService.getSellerStore(this.currentUser.user.token).subscribe(
      (res) => {
        this.stores = res.body.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  suppressionSrore(id) {
    this.storeId = id;
    this.effacerSwal.fire();
  }

  deleteStore() {
    this.storesService.deleteStores(this.storeId, this.currentUser.user.token).subscribe(
      (res) => {
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
      }
    );
  }
}
