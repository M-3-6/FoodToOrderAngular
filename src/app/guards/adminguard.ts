import { CanActivateFn } from "@angular/router";

export function AdminGuard():CanActivateFn{
    //let role="admin"

    let role = localStorage.getItem("role");

    return ()=>{
        if(role=="admin"){
            return true;
        }
        alert("sorry no access for role: "+role)
        return false;
    };
}
