import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/Products/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend-client';
  constructor(private productService: ProductsService) {}
  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      console.log(products);
    });
  }
}
