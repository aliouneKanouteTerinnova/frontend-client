import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  basUrl = 'http://ec2-3-122-251-34.eu-central-1.compute.amazonaws.com/api/';

  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get(this.basUrl);
  }
}
