import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from './../../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
uuidv4();
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  updateProducts = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    // is_active;
  });

  constructor(private router: ActivatedRoute, private route: Router, private productsService: ProductsService) {}

  ngOnInit(): void {
    console.log(this.router.snapshot.params.id);
    this.productsService.getCurrentData(this.router.snapshot.params.id).subscribe((res) => {
      console.log(res);
      this.updateProducts = new FormGroup({
        name: new FormControl(res['product'].name),
        description: new FormControl(res['product'].description),
        price: new FormControl(res['product'].price),
        quantity: new FormControl(res['product'].quantity),
        is_active: new FormControl(res['product'].is_active),
      });
      console.log(res['product'].is_active);
    });
  }

  // checkCheckBoxvalue(event) {
  //   console.log(event.checked);
  // }

  onSubmit() {
    this.productsService.updateProduct(this.router.snapshot.params.id, this.updateProducts.value).subscribe(
      (res) => {
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'Product modified',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        console.log('response ', res);
        // this.route.navigate(['/products']);
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
    console.log('Products updated ', this.updateProducts.value);
  }
}
