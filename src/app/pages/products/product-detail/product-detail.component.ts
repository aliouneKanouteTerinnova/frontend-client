import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  idProduct: string;
  product: any;
  fakePrice: number;
  indexPhoto: number;
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.idProduct = this.router.snapshot.params.id;
    this.indexPhoto = this.router.snapshot.params.indexPhoto;
    console.log(this.idProduct);
    this.productService.getCurrentData(this.idProduct).subscribe((response) => {
      // const product = JSON.stringify(response);
      this.product = response['product'];
      console.log(this.idProduct);
      this.fakePrice = Number(this.product.price) + 1000;
    });
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
