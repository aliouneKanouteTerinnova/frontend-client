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
    return this.httpClient.get<any>(`${environment.baseUrl}categories`);
  }

  getCategory(id: string) {
    return this.httpClient.get<any>(`${environment.baseUrl}categories/${id}`);
  }

  addCategory(category: Category, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}categories`, category, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateCategory(id: number, category: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put(`${environment.baseUrl}categories/${id}`, category, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}${id}`);
  }
}
