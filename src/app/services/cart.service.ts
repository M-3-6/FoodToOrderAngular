import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Dish } from '../models/dish';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = 'http://localhost:3000';

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

  getCartId() : string{
    let cartId = localStorage.getItem('userId')
    if (cartId != null )  return cartId;
    return "";
  }

  getCartById(id: string) : Observable<Cart> {
    return this.httpClient.get<Cart>(this.baseUrl + '/carts/' + id)
    .pipe(catchError(this.httpError));
  }

}
