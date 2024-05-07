import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../models/order';
import { DishService } from './dish.service';

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

  constructor(private httpClient: HttpClient, private dishService: DishService) {}

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
    console.log("order to be updated:", o)
    o.User = null;
    o.dishOrders.forEach((dishorder: any) => {
      console.log(dishorder.dishId);
      dishorder.dish = null;
      dishorder.order = null;
      // this.dishService.updateDish(dishorder.dish, dishorder.dishId).subscribe(
      //   data => {
      //     console.log("updated dish", data);
      //     dishorder.dish = null;
      //   }        
      // );
    });
    console.log(o); 
    return this.httpClient
      .put<Order>(this.baseUrl + '/Orders/' + oId, JSON.stringify(o), this.httpHeader)
      .pipe(catchError(this.httpError));
  }
}