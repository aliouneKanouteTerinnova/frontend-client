import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationsService {
  constructor(private httpClient: HttpClient) {}

  // User Registration

  register(user: any) {
    return this.httpClient.post(`${environment.baseUrl}users`, user);
  }
  // User Profil Update

  updateProfil(user: any, token: any) {
    return this.httpClient.put(`${environment.baseUrl}users`, user, {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      headers: new HttpHeaders().set('Authorization', `token ${token}`),
      observe: 'response',
    });
  }
  // Authentication

  login(user: any) {
    return this.httpClient.post(`${environment.baseUrl}users/login`, user);
  }

  // Get user authenticated
  getUser(token: string) {
    token = 'token ' + token;
    return this.httpClient.get(`${environment.baseUrl}user`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
