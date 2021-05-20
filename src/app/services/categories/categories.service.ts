import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Category } from '../../models/category/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories() {
    return this.httpClient.get<any>(`${environment.url}/categories`);
  }

  addCategory(category: Category) {
    return this.httpClient.post(`${environment.url}`, category);
  }

  updateCategory(id: number, category: any) {
    return this.httpClient.put(`${environment.url}/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.url}/${id}`);
  }
}
