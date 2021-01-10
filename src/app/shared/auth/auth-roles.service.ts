import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthRolesService {
  token
  constructor() { }

  getUserRole() {
    let t:object = jwt_decode(this.token)
    let roleValue
    for (const [key,value] of Object.entries(t)) {
      if(key.includes('role')){
        roleValue  = value
      }
    }

    if(roleValue == 'Admin'){
      return true
    }else{
      return false
    }
  }
  getUserDetails(){
    let t:any = jwt_decode(this.token)
    let roleValue
    for (const [key,value] of Object.entries(t)) {
      if(key.includes('role')){
        roleValue  = value
      }
    }
    return {name:t.UserName,role:roleValue}
  }

}
