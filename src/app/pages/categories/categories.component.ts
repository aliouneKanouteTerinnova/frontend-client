import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('Category', data.categories);
      this.categories = data.categories;
    });
  }
}
