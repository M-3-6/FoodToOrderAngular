import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  arrUsers:User[]
  constructor() { 
    this.arrUsers = [
      new User(101,"John","Doe","admin","admin@gmail.com","admin@12",new Date("2001-02-23"),new Address(101,"5/8","Ks road","Mallar","Mangalore","576897","India")),
      new User(1,"Peter","Doe","user","john@gmail.com","john@12",new Date("1995-08-06"),new Address(102,"5/8","Bs road","Karkala","Udupi","576497","India")),
      new User(2,"Rohan","Peter","user","rohan@gmail.com","rohan@12",new Date("2004-05-13"),new Address(103,"5/8","s road","Mallar","Mangalore","576897","India")),
      new User(3,"Rahul","Bhat","user","rahul@gmail.com","rahul@12",new Date("1997-11-03"),new Address(104,"5/8","Ks street","Mallar","Shivamogga","576897","India")),
      new User(4,"Jay","Lobo","user","jay@gmail.com","jay@12",new Date("2002-05-15"),new Address(105,"5/8","Ks road","Mallar","Mangalore","576897","India")),
      new User(5,"Sharon","Dsouza","user","sharon@gmail.com","sharon@12",new Date("1992-08-15"),new Address(106,"5/8","Ks road","Mg road","Bangalore","576897","India")),
    ]
  }

  getUsers(){
    return this.arrUsers;
}

getUserById(uid:number){
  console.log("Id obtained in service = "+uid)
 for(var i=0;i<this.arrUsers.length;i++){
      if(this.arrUsers[i].id==uid){
          
          return this.arrUsers[i];
      }
    
  }
  return new User(0,'' , '','','','',new Date(),new Address(0,'','','','','',''))
}


  addUser(u:User){
    this.arrUsers.push(u)
    console.log(this.arrUsers)
  }

  updateUser(u:User){
    for(var i=0 ; i<this.arrUsers.length ; i++){
      if(this.arrUsers[i].id==u.id){
        this.arrUsers[i] = u;
        break;
      }
    }
    console.log(this.arrUsers)
  }

  delUser(id:number){
    for(var i=0 ; i<this.arrUsers.length ; i++){
      if(this.arrUsers[i].id==id){
        this.arrUsers.splice(i,1);
        break;
      }
    }
    console.log(this.arrUsers)
  }
}
