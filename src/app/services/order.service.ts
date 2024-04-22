import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl:string="http://localhost:3000"

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) {

  }

  httpError(error:HttpErrorResponse){ 
    let msg=""
    if(error.error instanceof ErrorEvent){
      msg=error.error.message
    }
    else{
      msg='Error code:${error.status}\nMessage:${error.message}';
    }
    return throwError(msg)
  }

  getOrders() : Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.baseUrl + '/orders').pipe(
      catchError(this.httpError)
    );
  }

  getOrderById(oId:number) : Observable<Order> {
    return this.httpClient.get<Order>(this.baseUrl + '/orders/' + oId).pipe(
      catchError(this.httpError)
    );
  }

  getOrdersByUserId(uId:number) : Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.baseUrl + '/orders?userId=' + uId).pipe(
      catchError(this.httpError)
    );
  }

  addOrder(o:Order) : Observable<Order> {
    return this.httpClient.post<Order>(this.baseUrl + '/orders/', JSON.stringify(o), this.httpHeader).pipe(
      catchError(this.httpError)
    )
  }

  updateOrder(o:Order, uId: number) : Observable<Order> {
    return this.httpClient.put<Order>(this.baseUrl + '/orders/' + uId, JSON.stringify(o), this.httpHeader).pipe(
      catchError(this.httpError)
    )
  }

}
