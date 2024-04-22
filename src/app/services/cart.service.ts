import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';

import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  

  getCartById(cId:number) : Observable<Cart> {
    console.log(cId)
    return this.httpClient.get<Cart>(this.baseUrl + '/carts/' + cId).pipe(
      catchError(this.httpError)
    );
  }

  updateDishInCart(cId:number, dish:Dish){
    const url = `${this.baseUrl}/carts/${cId}/arrDishes/${dish.id}`;
  return this.httpClient.put<Dish>(url, dish, this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }
}
