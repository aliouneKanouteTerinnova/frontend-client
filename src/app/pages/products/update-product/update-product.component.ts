import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from './../../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/models/products/products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  updateProducts: FormGroup;
  name;
  description;
  price;
  // products = [];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateProducts = this.fb.group({
      name: [],
      description: [],
      price: [],
    });
    console.log(this.router.snapshot.params.id);
    // this.productsService.getCurrentData(this.router.snapshot.params.id).subscribe((res) => {
    //   new FormGroup({
    //     name: new FormControl(res['name']),
    //     description: new FormControl(res['description']),
    //     price: new FormControl(res['price']),
    //   });
    //   console.log(res);
    // });

    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      console.log('Product', data);
      // this.products = data;
      this.name = data.name;
      this.description = data.description;
      this.price = data.price;
    });
  }

  onSubmit() {
    const data = new Products();
    data.name = this.updateProducts.get('name').value;
    data.description = this.updateProducts.get('description').value;
    data.price = this.updateProducts.get('price').value;
    console.log(data);

    this.productsService.updateProduct(this.router.snapshot.params.id, data).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product modified',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.route.navigate(['/products']);
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
}
