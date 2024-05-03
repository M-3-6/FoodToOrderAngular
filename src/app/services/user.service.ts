import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from '../models/user';
import { Address } from '../models/address';
import { Observable, catchError, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string="https://localhost:7092/api"

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
  
  getUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + '/Users').pipe(
      catchError(this.httpError)
    );
  }

  getUserById(uId:string) : Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/Users/' + uId).pipe(
      catchError(this.httpError)
    );
  }

  addUser(u:User) : Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/Users/', JSON.stringify(u), this.httpHeader).pipe(
      catchError(this.httpError)
    )
  }

  updateUser(u:User, uId: string) : Observable<User> {
    console.log(u);
    return this.httpClient.put<User>(this.baseUrl + '/Users/' + parseInt(uId), JSON.stringify(u), this.httpHeader).pipe(
      catchError(this.httpError)
    )
  }

}