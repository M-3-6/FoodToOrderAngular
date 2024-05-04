import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = 'https://localhost:7092/api';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = 'Error code:${error.status}\nMessage:${error.message}';
    }
    return throwError(msg);
  }

  getOrders(): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(this.baseUrl + '/Orders')
      .pipe(catchError(this.httpError));
  }

  getOrderById(oId: number): Observable<Order> {
    return this.httpClient
      .get<Order>(this.baseUrl + '/Orders/' + oId)
      .pipe(catchError(this.httpError));
  }

  getOrdersByUserId(uId: number): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(this.baseUrl + '/Orders/' + uId)
      .pipe(catchError(this.httpError));
  }

  addOrder(o: Order) {
    return this.httpClient
      .post<Order>(
        this.baseUrl + '/Orders/',
        JSON.stringify(o),
        this.httpHeader
      )
      .pipe(catchError(this.httpError));
  }

  updateOrder(o: any, oId: any): Observable<Order> {
    return this.httpClient
      .put<Order>(this.baseUrl + '/Orders/' + oId, JSON.stringify(o), this.httpHeader)
      .pipe(catchError(this.httpError));
  }
}