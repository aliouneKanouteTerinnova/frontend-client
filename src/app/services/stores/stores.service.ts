import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Store } from './../../pages/stores/store';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  url = 'http://192.168.1.16:8000/store';

  constructor(private http: HttpClient) {}

  getAllStores() {
    return this.http.get<any>(`${this.url}/stores`);
  }

  createStores(store: Store, token: string) {
    token = 'token ' + token;
    return this.http.post(`${this.url}/createstore`, store, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  deleteStores(id: number, token: string) {
    token = 'token ' + token;
    return this.http.delete<any>(`${this.url}/deletestore/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
