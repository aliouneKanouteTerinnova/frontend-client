import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products/products';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  categories: Category[];
  listParent: Category[];
  products: Products[];

  constructor(private categoryService: CategoriesService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('categories', data);
      this.categories = data;
      console.log(this.categories);
      this.listParent = this.categories.filter((category) => {
        return category.parent === null;
      });
      console.log(this.listParent);
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      console.log('products', data);
      this.products = data.results;
      this.products.slice(0, 15);
      console.log(this.products);
    });
  }
}
