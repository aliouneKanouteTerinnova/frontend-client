import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { ProductReviewService } from 'src/app/services/product-review/product-review.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import Swal from 'sweetalert2';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { UpdateProductReviewComponent } from '../product-review/update-product-review/update-product-review.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  idProduct: string;
  product: any;
  productImage: any;
  images = [];
  fakePrice: number;
  indexPhoto: number;
  store: any;
  products = [];
  otherProducts = [];
  similarProducts = [];
  currentUser: any;
  isOwner: any;
  constructor(
    private productsService: ProductsService,
    private router: ActivatedRoute,
    private cartService: CartService,
    private storesService: StoresService,
    private i18nServiceService: I18nServiceService,
    private productReviewService: ProductReviewService,
    private authService: AuthenticationsService,
    public addDialog: MatDialog,
    public editDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.idProduct = this.router.snapshot.params.id;
    this.indexPhoto = this.router.snapshot.params.indexPhoto;
    this.currentUser = this.authService.currentUserValue;

    this.getProducts();
    this.productsService.getCurrentData(this.idProduct).subscribe((response) => {
      this.storesService.getCurrentData(response.store).subscribe(
        (data) => {
          this.store = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
      this.product = response;
      this.productImage = response.images[0].file;
      this.images = response.images.slice(0, 4);
      this.fakePrice = Number(this.product.price) + 1000;
    });
  }

  updateReview(id) {
    const dialogRef = this.editDialog.open(UpdateProductReviewComponent, { width: '600px', data: id });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${id}`);
    });
  }

  deleteReview(id) {
    this.productReviewService.deleteReview(id, this.currentUser.user.token).subscribe((res) => {});
    window.location.reload();
  }

  addReview(id: any) {
    const dialogRef = this.addDialog.open(ProductReviewComponent, { width: '600px', data: id });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${id}`);
    });
  }

  changeImage(i: number) {
    this.productImage = this.images[i].file;
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id);
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.similarProducts = data.results.slice(0, 4);
      this.otherProducts = data.results.slice(4, 8);
    });
  }

  formatPrice(price: any) {
    var prices = price?.split('.');
    if (this.i18nServiceService.currentLangValue === null || this.i18nServiceService.currentLangValue === 'en') {
      prices = price;
    } else {
      prices = prices[0] + ',' + prices[1];
      if (prices.split(',').length > 2) {
        prices = prices.split(',')[0] + '' + prices.split(',')[1] + ',' + prices.split(',')[2];
      }
    }
    return prices;
  }
}
