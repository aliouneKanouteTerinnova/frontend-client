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
  id = 'f36c9778-722b-48e0-85df-cfc1a12e95fc';

  constructor(private categoryService: CategoriesService, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategory();
    this.getProducts();
    this.getCategoryById();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log(data);
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

  getCategoryById() {
    this.categoryService.getCategory(this.id).subscribe((res) => {
      console.log(res);
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.results;
      this.products.slice(0, 15);
    });
  }
}
