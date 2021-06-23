/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationsService } from 'src/app/services/authentications/authentications.service';
uuidv4();

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss'],
})
export class CreateCategoriesComponent implements OnInit {
  createCategoriesForm: FormGroup;
  categories: Category;
  currentUser: any;
  categoryId: any;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private authService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.createCategoriesForm = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      // is_active: ['', Validators.required],
      // created_by: ['', Validators.required],
      parent: [''],
    });
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log('Category', data);
      this.categories = data;
    });
  }

  categoryEvent(event) {
    this.categoryId = event.target.value;
  }

  onSubmit() {
    const categories = new Category();

    // categories.id = '';
    categories.name = this.createCategoriesForm.get('name').value;
    categories.slug = this.createCategoriesForm.get('slug').value;
    categories.description = this.createCategoriesForm.get('description').value;
    categories.is_active = true;
    // categories.created_by = '';
    // categories.products = '';
    if (this.createCategoriesForm.get('parent').value === '---') {
      categories.parent = null;
    } else {
      categories.parent = this.createCategoriesForm.get('parent').value;
    }

    console.log(categories);
    console.log(categories.parent);

    this.categoryService.addCategory(categories, this.currentUser.user.token).subscribe(
      (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/categories']);
        console.log(res);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.error,
        });
        console.log(err);
      }
    );
  }
}
