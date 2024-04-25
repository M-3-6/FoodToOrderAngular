import { CanActivateFn } from "@angular/router";

export function AdminGuard():CanActivateFn{
    //let role="admin"

    let role 
   
    

    return ()=>{
       role = localStorage.getItem("role");
       console.log(role)
        if(role=="admin"){
            return true;
        }
        alert("sorry no access for role: "+role)
        return false;
    };
}
