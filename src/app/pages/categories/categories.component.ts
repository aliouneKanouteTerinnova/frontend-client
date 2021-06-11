import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { AuthenticationsService } from 'src/app/services/authentications.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category;
  currentUser: any;

  constructor(private categoryService: CategoriesService, private authService: AuthenticationsService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.getCategory();
    console.log(this.currentUser);
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('Category', data);
      this.categories = data.results;
    });
  }

  deleteCategory(id) {
    this.categoryService.deleteCategory(id, this.currentUser.user.token).subscribe((res) => {
      console.log(res);
    });
  }
}
