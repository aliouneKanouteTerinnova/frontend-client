import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  update(token: any, id: string, data: any){
    token = 'token ' + token;
    return this.http.put<any>(`${environment.baseUrl}/shippings/shipments/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

}
