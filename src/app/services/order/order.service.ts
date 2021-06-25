import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  /* Getting all customer orders */
  getAllOrders(token: string) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}orders/customers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  /* Getting all customer orders for specific seller*/
  getAllOrdersFromSeller(token: string) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}orders/sellers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  /*Adding order*/
  addOrder(order: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}orders/initiate`, order, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateOrder(id: number, data: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}orders/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  /*Getting single order*/
  getOrder(id: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}orders/${id}`);
  }
  /*Delete an order*/
  deleteOrder(id: number, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}orders/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
