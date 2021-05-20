import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  addCategory(category: Category, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.url}/categories`, category, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateCategory(id: number, category: any) {
    return this.httpClient.put(`${environment.url}/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.url}/${id}`);
  }
}
