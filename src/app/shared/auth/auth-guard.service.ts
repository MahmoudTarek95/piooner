import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  // constructor(private authService: AuthService, private router: Router) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   let isAuth = this.authService.isAuthenticated();
  //   if (!isAuth) {
  //     this.router.navigate(['/pages/login']);
  //   }
  //   else {
  //     return true;
  //   }
  // }
  constructor(
    private router: Router,
    private authenticationService: AuthService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
