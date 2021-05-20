import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from './../../pages/stores/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  // url = 'http://192.168.1.16:8000/api';

  constructor(private http: HttpClient) {}

  getAllStores() {
    return this.http.get<any>(`${environment.url}/stores`);
  }

  createStores(store: Store, token: string) {
    token = 'token ' + token;
    return this.http.post(`${environment.url}/stores`, store, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  upDateStores(id: number, store: Store, token: string) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.url}/updatestore/${id}`, store, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCurrentData(id) {
    return this.http.get<any>(`${environment.url}/stores/${id}`);
  }

  deleteStores(id: number, token: string) {
    token = 'token ' + token;
    return this.http.delete<any>(`${environment.url}/stores/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
