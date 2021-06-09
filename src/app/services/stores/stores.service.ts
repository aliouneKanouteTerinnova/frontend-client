import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from './../../pages/stores/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor(private http: HttpClient) {}

  getAllStores() {
    return this.http.get<any>(`${environment.baseUrl}/stores`);
  }

  createStores(store: any, token: string) {
    token = 'token ' + token;
    return this.http.post(`${environment.baseUrl}/stores`, store, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  upDateStores(id: string, store: any, token: string) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}/stores/${id}`, store, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCurrentData(id: string) {
    return this.http.get<any>(`${environment.baseUrl}/stores/${id}`);
  }

  deleteStores(id: string, token: string) {
    token = 'token ' + token;
    return this.http.delete<any>(`${environment.baseUrl}/stores/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
