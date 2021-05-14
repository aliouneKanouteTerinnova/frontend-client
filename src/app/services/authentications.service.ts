/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth, AuthUser } from '../models/auth';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationsService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  // Authentication

  login(user: any) {
    return this.httpClient.post<AuthUser>(`${environment.baseUrl}users/login`, user).pipe(
      map((userResponded) => {
        // login successful if there's a jwt token in the response
        if (userResponded) {
          this.cookieService.set('currentUser', JSON.stringify(user));
        }
        return userResponded;
      })
    );
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
