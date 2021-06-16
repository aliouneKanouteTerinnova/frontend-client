import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  categories: Category[];
  listParent: Category[];
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('Category', data);
      this.categories = data.results;
      this.listParent = this.categories.filter((category) => {
        return category.parent === null;
      });
      console.log(this.listParent);
    });
  }
}
