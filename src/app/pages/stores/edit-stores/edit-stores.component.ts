import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores/stores.service';
import { Store } from './../store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-stores',
  templateUrl: './edit-stores.component.html',
  styleUrls: ['./edit-stores.component.scss'],
})
export class EditStoresComponent implements OnInit {
  token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiZXhwIjoxNjIxMzQxMDg4fQ.o6ypxFQZGa6SMBUwEF2Bjx_mvBmcEjGKaSI4iJzsJPE';

  editStore = new FormGroup({
    name: new FormControl(''),
    // created_at: new FormControl(''),
    // created_by: new FormControl(''),
    store_address: new FormControl(''),
  });

  constructor(private storesService: StoresService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    // this.editStore = this.fb.group({
    //   name: ['', Validators.required],
    //   created_at: [''],
    //   created_by: [''],
    //   store_address: ['', Validators.required],
    // });
    this.storesService.getCurrentData(this.router.snapshot.params.id).subscribe((res) => {
      console.log(res);
      this.editStore = new FormGroup({
        name: new FormControl(res['name']),
        // created_at: new FormControl(res['created_at']),
        // created_by: new FormControl(res['created_by']),
        store_address: new FormControl(res['store_address']),
      });
    });
  }

  onSubmit() {
    const data = new Store();
    data.name = this.editStore.get('name').value;
    // data.created_at = this.editStore.get('created_at').value;
    // data.created_by = this.editStore.get('created_by').value;
    data.store_address = this.editStore.get('store_address').value;

    console.log(data);

    this.storesService.upDateStores(this.router.snapshot.params.id, data, this.token).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product modified',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/create-store']);
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
}
