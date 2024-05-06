import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
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
  updateDish(d: Dish, dId: string): Observable<Dish> {
    console.log("dish to be updated:", d)
    return this.httpClient
      .put<Dish>(this.baseUrl + '/Dishes/' + dId, JSON.stringify(d), this.httpHeader)
      .pipe(catchError(this.httpError));
  }
}
