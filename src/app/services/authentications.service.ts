import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationsService {
  constructor(private httpClient: HttpClient) {}

  // register() {
  //   return this.httpClient.get(`${environment.baseUrl}users`,{user});
  // }
}
