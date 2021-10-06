import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StripePaymentDto } from 'src/app/dtos/payment/stripe-payment-dto';
import { environment } from 'src/environments/environment';
import { BankAccount } from 'src/app/models/payment/bank-account';
import { CreditCard } from 'src/app/models/payment/credit-card';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  initiateStripePayment(token: any, info: StripePaymentDto) {
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}payments/stripe`, info, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  confirmStripePayment(token: any, paymentIntentId: any, orderNumber: string) {
    token = 'token ' + token;
    return this.httpClient.put<any>(
      `${environment.baseUrl}payments/stripe/${paymentIntentId}`,
      { order_number: orderNumber },
      {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      }
    );
  }

  addBankAccount(token: any, account: BankAccount) {
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}payments/accounts`, account, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getBankAccount(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}payments/accounts`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  addCreditCard(token: any, card: CreditCard) {
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}payments/cards`, card, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCreditCard(token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}payments/cards`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
