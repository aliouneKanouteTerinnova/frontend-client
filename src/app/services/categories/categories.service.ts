import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Category } from '../../models/category/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  basUrl = 'http://ec2-3-122-251-34.eu-central-1.compute.amazonaws.com/api/';

  constructor(private httpClient: HttpClient) {}

  getAllCategories() {
    return this.httpClient.get<any>(`${environment.url}categories`);
  }

  addCategory(category: Category) {
    return this.httpClient.post(`${environment.url}addcategory`, category);
  }

  updateCategory(id: number, category: any) {
    return this.httpClient.put(`${environment.url}updatecategory/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.url}deletecategory/${id}`);
  }
}
