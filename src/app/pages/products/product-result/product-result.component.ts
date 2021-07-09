import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { I18nServiceService } from 'src/app/services/i18n-service/i18n-service.service';
import { ProductsService } from 'src/app/services/products/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.css'],
})
export class ProductResultComponent implements OnInit {
  products = [];
  product: any;
  keyWord: any;
  isClicked = false;
  constructor(
    private productsService: ProductsService,
    private i18nServiceService: I18nServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product = this.router.snapshot.params.keyword;
    this.searchProducts(this.product);
  }
  searchProducts(keyWord: string) {
    this.productsService.searchProducts(keyWord).subscribe(
      (data) => {
        this.isClicked = false;
        this.products = data.results;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `An error occured`,
        });
      }
    );
  }
  searchProduct(keyWord: string) {
    this.searchProducts(keyWord);
    this.keyWord = keyWord;
    this.isClicked = true;
  }

  hey(keyWord: string) {
    console.log(keyWord);
  }

  formatPrice(price: any) {
    var prices = price.split('.');
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
