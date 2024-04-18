import { Address } from "./address"

export class User{
    id:number
    firstName:string
    lastName:string
    role:string
    email:string
    password:string
    address:Address
    date_of_birth:Date

    constructor(Id:number,Fname:string, Lname:string, email:string,pwd:string,role:string,dob:Date,address:Address){
        this.id = Id;
        this.firstName = Fname;
        this.lastName = Lname;
        this.role = role;
        this.email = email;
        this.password = pwd;
        this.address = address;
        this.date_of_birth = dob;
    }
}