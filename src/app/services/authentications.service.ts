/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth, AuthResponded, AuthUser } from '../models/auth';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationsService {
  private currentUserSubject: BehaviorSubject<AuthResponded>;
  public currentUser: Observable<AuthResponded>;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    if (cookieService.check('currentUser')) {
      this.currentUserSubject = new BehaviorSubject<AuthResponded>(JSON.parse(this.cookieService.get('currentUser')));
    } else {
      this.currentUserSubject = new BehaviorSubject<null>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponded {
    return this.currentUserSubject.value;
  }

  // Authentication

  login(user: any) {
    return this.httpClient.post<AuthResponded>(`${environment.baseUrl}users/login`, user).pipe(
      map((userResponded) => {
        // login successful if there's a jwt token in the response
        if (userResponded) {
          this.cookieService.set('currentUser', JSON.stringify(userResponded));
          this.currentUserSubject.next(userResponded);
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
