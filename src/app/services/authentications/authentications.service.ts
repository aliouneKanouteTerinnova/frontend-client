/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, AuthResponded } from 'src/app/models/auth/auth';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user/user';
import { CartService } from '../cart/cart.service';
import { CartModelServer } from 'src/app/models/cart/cart';
import { Item } from 'src/app/models/item/item';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationsService {
  private currentUserSubject: BehaviorSubject<AuthResponded>;
  public currentUser: Observable<AuthResponded>;
  order = [];
  orderProducts = [];
  currentUserC: any;
  cartData: CartModelServer;

  constructor(private httpClient: HttpClient, public cartService: CartService, private cookieService: CookieService) {
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => {
      this.cartData = data;
    });
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
        if (userResponded) {
          this.cookieService.set('currentUser', JSON.stringify(userResponded));
          this.currentUserSubject.next(userResponded);
          this.currentUserC = this.currentUserValue;
          let count = 0;

          if (this.cartData.data[0].numInCart !== 0) {
            this.cartData.data.forEach((element) => {
              count++;
              const item: Item = {
                product: element.product.id,
                quantity: 1,
              };
              if (element.numInCart === 1) {
                this.cartService.addItemToCart(item, this.currentUserC['user'].token).subscribe(
                  (dataItem) => {},
                  (error) => {
                    console.log(error);
                  }
                );
              } else {
                for (let index = 0; index < element.numInCart; index++) {
                  this.cartService.addItemToCart(item, this.currentUserC['user'].token).subscribe(
                    (dataItem) => {},
                    (error) => {
                      console.log(error);
                    }
                  );
                }
              }
              if (count === this.cartData.data.length) {
                this.cartService.deleteCart();
                this.cartService.getCart(this.currentUserC['user'].token).subscribe(
                  (data) => {
                    if (data.body && data.body.status === 'Open') {
                      this.orderProducts = data.body.items;
                      if (this.orderProducts.length > 0) {
                        this.orderProducts.forEach((element) => {
                          if (element.quantity === 1) {
                            this.cartService.addProductToBasket(element.product.id);
                          } else {
                            for (let index = 0; index < element.quantity; index++) {
                              this.cartService.addProductToBasket(element.product.id);
                            }
                          }
                        });
                      }
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            });
          } else {
            this.cartService.getCart(this.currentUserC['user'].token).subscribe(
              (data) => {
                if (data.body && data.body.status === 'Open') {
                  this.orderProducts = data.body.items;
                  if (this.orderProducts.length > 0) {
                    this.orderProducts.forEach((element) => {
                      if (element.quantity === 1) {
                        this.cartService.addProductToBasket(element.product.id);
                      } else {
                        for (let index = 0; index < element.quantity; index++) {
                          this.cartService.addProductToBasket(element.product.id);
                        }
                      }
                    });
                  }
                }
              },
              (error) => {
                console.log(error);
              }
            );
          }
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
  getUserById(id: string, token: string) {
    token = 'token ' + token;
    return this.httpClient
      .get<AuthResponded>(`${environment.baseUrl}users/${id}`, {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      })
      .pipe(map((userResponded) => userResponded));
  }

  // Update User Profile

  update(username: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put(`${environment.baseUrl}users`, username, {
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
    this.cartService.deleteCart();
  }

  //Password reset
  getEmailToResetPassword(email: any) {
    return this.httpClient.post<any>(`${environment.baseUrl}users/password/reset/`, email);
  }

  resetPassword(value: any) {
    return this.httpClient.patch<any>(`${environment.baseUrl}users/password/reset/complete/`, value);
  }
}
