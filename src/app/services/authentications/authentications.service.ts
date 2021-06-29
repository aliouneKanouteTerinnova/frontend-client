/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, AuthResponded } from 'src/app/models/auth/auth';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user/user';

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

  login(user: Auth) {
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
    return this.httpClient
      .get<AuthResponded>(`${environment.baseUrl}users`, {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      })
      .pipe(map((userResponded) => userResponded));
  }

  // Get user by id
  getUserById(id: string) {
    return this.httpClient
      .get<AuthResponded>(`${environment.baseUrl}users/${id}`)
      .pipe(map((userResponded) => userResponded));
  }

  // Update User Profile

  update(username: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put(`${environment.baseUrl}user`, username, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  // User Registration

  register(user: User) {
    return this.httpClient.post<any>(`${environment.baseUrl}users/register/`, user);
  }

  // Verify token

  verifyToken(token: any, email: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}users/verify/?token=` + token + `&email=` + email);
  }

  // Resend mail

  resend(email: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}users/resend/`, email);
  }

  // User Logout
  logOut() {
    this.cookieService.delete('currentUser');
    this.currentUserSubject.next(null);
  }

  //Password reset
  getEmailToResetPassword(email: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}users/password/reset/`, email);
  }

  resetPassword(value: any) {
    return this.httpClient.patch<any>(`${environment.baseUrl}users/password/reset/complete/`, value);
  }
}
