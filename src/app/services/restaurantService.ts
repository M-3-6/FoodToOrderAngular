import { Address } from "../models/address";
import { Dish } from "../models/dish";
import { Restaurant } from "../models/restaurant";
import { Injectable } from '@angular/core';
import {HttpHeaders,HttpErrorResponse,HttpClient} from '@angular/common/http'
import {Observable,throwError,catchError} from "rxjs"

@Injectable()
export class RestaurantService{

    arrRestaurants:Restaurant[]

    baseUrl:string="http://localhost:3000"

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
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

      constructor(private httpClient:HttpClient){
        this.arrRestaurants=[]
            // new Restaurant(100,"Dominos","Bangalore",3,[
            //   new Dish(301,"Pizza",199,"../../assets/Images/pizza.jfif",100),
            //   new Dish(302,"Burger",149,"../../assets/Images/burger.jfif",100)],
            // [new Address(1,"2/3","NG palya","victoria","Bangalore","572114","India"),
            // new Address(2,"2/3","NG palya","victoria","Bangalore","572114","India")
            // ]),
        
            // new Restaurant(101,"KFC","Bangalore",4,
            // [new Dish(401,"Hamburger",199,"../../assets/Images/hamburger.jfif",101),
            // new Dish(402,"Fries",149,"../../assets/Images/fries.jfif",101)],[new Address(1,"2/3","NG palya","victoria","Bangalore","572114","India"),
            // new Address(2,"2/3","NG palya","victoria","Bangalore","572114","India")
            // ]),
        
            // new Restaurant(102,"Rameshwaram","Bangalore",5,
            // [new Dish(501,"Dosa",199,"../../assets/Images/dosa.jfif",102),
            // new Dish(502,"Idli",149,"../../assets/Images/idli.jfif",102)],
            // [new Address(1,"2/3","NG palya","victoria","Bangalore","572114","India"),
            // new Address(2,"2/3","NG palya","victoria","Bangalore","572114","India")
            // ])
          
      }
    getRestaurants():Observable<Restaurant[]>{
        return this.httpClient.get<Restaurant[]>(this.baseUrl+'/restaurants').pipe(
          catchError(this.httpError)
        )
    }
    getRestaurantById(rid:number):Observable<Restaurant>{
      //   console.log("Id obtained in service = "+rid)
      //  for(var i=0;i<this.arrRestaurants.length;i++){
      //       if(this.arrRestaurants[i].id==rid){
      //           console.log(this.arrRestaurants[i].rName)
      //           return this.arrRestaurants[i];
      //       }
      //      // return new Restaurant(0,'','',0,[])
      //   }
      //  return new Restaurant(0,'','',0,[],[])

      return this.httpClient.get<Restaurant>(this.baseUrl+'/restaurants/'+rid).pipe(
        catchError(this.httpError)
      )
  }

addRestaurant(r:Restaurant):Observable<Restaurant>{
return this.httpClient.post<Restaurant>(this.baseUrl+'/restaurants/',JSON.stringify(r),this.httpHeader).pipe(
  catchError(this.httpError))
}


}


