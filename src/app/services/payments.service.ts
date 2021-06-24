/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  payment(body: any, token: string) {
    token = 'token ' + token;
    return this.http.post<any>(`${environment.baseUrl}payments/stripe`, body, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  confirmCardPayment(token: string, id: any, body: any) {
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}payments/stripe/${id}`, body, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
