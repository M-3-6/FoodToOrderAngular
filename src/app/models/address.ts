export class Address{
    id:number
    houseno:string
    street:string
    area:string
    city:string
    pincode:string
    country:string
    
    constructor(id:number,houseno:string,street:string,area:string,city:string,pincode:string,country:string){
    this.id=id;
    this.houseno=houseno;
    this.street=street;
    this.area=area;
    this.city=city;
    this.pincode=pincode;
    this.country = country;
    }
    }