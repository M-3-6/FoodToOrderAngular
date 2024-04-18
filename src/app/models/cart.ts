export class Cart{
    Id:number
    Amount:number
    UserId:number
    constructor(Id:number,Amount:number,UserId:number){
        this.Id = Id;
        this.Amount = Amount;
        this.UserId = UserId;
    }
}