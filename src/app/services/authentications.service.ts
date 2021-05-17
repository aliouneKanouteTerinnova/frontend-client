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

  register(user: User) {
    return this.httpClient.post(`${environment.baseUrl}users`, user);
  }
}
