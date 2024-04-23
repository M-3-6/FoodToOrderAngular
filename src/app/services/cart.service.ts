import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Dish } from '../models/dish';
import { Cart } from '../models/cart';
import { switchMap } from 'rxjs/operators';


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

  getCartId() : string{
    let cartId = localStorage.getItem('userId')
    if (cartId != null )  return cartId;
    return "";
  }


  // getCartById(cId:number) : Observable<Cart> {
  //   console.log(cId)
  //   return this.httpClient.get<Cart>(this.baseUrl + '/carts/' + cId).pipe(
  //     catchError(this.httpError)
  //   );
  // }

  getCartById(cId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.baseUrl}/carts/${cId}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // If cart not found, create a new cart
          return this.createCartForUser(cId).pipe(
            switchMap(() => this.getCartById(cId))
          );
        }
        return throwError(error);
      })
    );
  }
  
  createCartForUser(cId: number): Observable<Cart> {
    return this.httpClient.post<Cart>(
      `${this.baseUrl}/carts`,
      JSON.stringify(new Cart(cId,0,[],[])),
      this.httpHeader
    ).pipe(
      catchError(this.httpError)
    );
  }
  



getCartByUserId(userId: string): Observable<Cart> {
  return this.httpClient.get<Cart>(`${this.baseUrl}/carts?userId=${userId}`).pipe(
    catchError(this.httpError)
  );
}

updateCart(cart: Cart): Observable<Cart> {
  return this.httpClient.put<Cart>(
    `${this.baseUrl}/carts/${cart.id}`,
    cart,
    this.httpHeader
  ).pipe(
    catchError(this.httpError)
  );
}


  
}
