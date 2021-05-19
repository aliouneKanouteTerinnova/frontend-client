import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Products } from '../../models/products/products';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  // getAllProducts() {
  //   return this.httpClient.get<any>(`${this.basUrl}`);
  // }
  getAllProducts() {
    return this.httpClient.get<any>(`${environment.url}/products`);
  }

  getLatestProducts() {
    return this.httpClient.get<any>(`${environment.url}latest-products/`);
  }

  addProduct(product: Products, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.url}/products`, product, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // updateProduct(product: Products): Observable<Products> {
  //   const url = `${environment.url}updateproduct/${product.id}`;
  //   return this.httpClient.put<Products>(url, product, httpOptions);
  // }
  updateProduct(id: number, data: any) {
    return this.httpClient.put<any>(`${environment.url}/products/${id}`, data);
  }

  getCurrentData(id) {
    return this.httpClient.get(`${environment.url}/products/${id}`);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${environment.url}/${id}`);
  }
}
