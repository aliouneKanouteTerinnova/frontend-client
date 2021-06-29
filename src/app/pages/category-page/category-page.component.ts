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
  category1: any;
  category2: any;
  category3: any;

  constructor(private categoryService: CategoriesService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data.results;
      this.listParent = this.categories.filter((category) => category.parent === null);
      if (this.listParent.length >= 3) {
        this.category1 = this.listParent[0].name;
        this.category2 = this.listParent[1].name;
        this.category3 = this.listParent[2].name;
      } else if (this.listParent.length === 2) {
        this.category1 = this.listParent[0].name;
        this.category2 = this.listParent[1].name;
        this.category3 = null;
      } else if (this.listParent.length === 1) {
        this.category1 = this.listParent[0].name;
        this.category2 = null;
        this.category3 = null;
      } else {
        this.category1 = null;
        this.category2 = null;
        this.category3 = null;
      }
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
      this.products.slice(0, 15);
    });
  }
}
