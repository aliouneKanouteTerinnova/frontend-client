import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/review/review';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private httpClient: HttpClient) {}

  addReview(review: Review, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}products/reviews`, review, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateReview(id: number, data: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}products/reviews/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCurrentData(id: any) {
    return this.httpClient.get<any>(`${environment.baseUrl}products/reviews/${id}`);
  }

  deleteReview(id: number, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}products/reviews/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
