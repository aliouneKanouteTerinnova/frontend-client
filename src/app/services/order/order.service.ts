import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderDto } from 'src/app/dtos/order/order-dto';
import { Order } from 'src/app/models/order/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  sellerOrders: any[] = [];
  sellerOrdersSubject = new Subject<any[]>();
  constructor(private httpClient: HttpClient) {}

  emitSellerOrders() {
    this.sellerOrdersSubject.next(this.sellerOrders);
  }

  /* Getting all customer orders */
  getAllOrders(token: string) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}orders/customers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getSellerOrders(token: string) {
    token = 'token ' + token;
    this.httpClient
      .get<any>(`${environment.baseUrl}orders/sellers`, {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      })
      .pipe()
      .subscribe((response) => {
        this.sellerOrders = [];
        let data = response.body;
        for (let i = 0; i < data.length; i++) {
          this.sellerOrders.push(data[i]);
        }
        this.emitSellerOrders();
      });
  }

  getSellerOrderDetail(id) {
    return this.sellerOrders[id];
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
  getOrder(id: any, token: any) {
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}orders/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
  /*Delete an order*/
  deleteOrder(id: number, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}orders/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  initiate(token: any, order: OrderDto){
    token = 'token ' + token;
    return this.httpClient.post<any>(`${environment.baseUrl}orders/initiate`, order, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getSOrders(token: any){
    token = 'token ' + token;
    return this.httpClient
      .get<any>(`${environment.baseUrl}orders/sellers`, {
        headers: new HttpHeaders().set('Authorization', token),
        observe: 'response',
      })
  }

  getCustomerOrders(token :any){
    token = 'token ' + token;
    return this.httpClient.get<any>(`${environment.baseUrl}orders/customers`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
