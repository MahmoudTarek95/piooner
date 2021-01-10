import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRolesService } from './auth-roles.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(private authRoleService: AuthRolesService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authRoleService.getUserRole()){
        return true
      }

      this.router.navigate(['/pages/error'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
