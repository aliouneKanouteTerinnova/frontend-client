import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category/category';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationsService } from 'src/app/services/authentications.service';
uuidv4();

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss'],
})
export class CreateCategoriesComponent implements OnInit {
  createCategoriesForm: FormGroup;
  categorys: Category;
  currentUser: any;
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
    });
  }

  onSubmit() {
    const categories = new Category();

    categories.id = Math.floor(Math.random() * 100);
    categories.name = this.createCategoriesForm.get('name').value;
    categories.slug = this.createCategoriesForm.get('slug').value;
    categories.description = this.createCategoriesForm.get('description').value;
    categories.is_active = true;
    categories.created_by = '';
    categories.products = '';

    console.log(categories);

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
          text: 'Something went wrong!',
        });
        console.log(err);
      }
    );
  }
}
