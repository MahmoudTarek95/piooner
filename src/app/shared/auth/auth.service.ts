
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';
import { AuthRolesService } from './auth-roles.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private authRolesService: AuthRolesService, private router:Router) {
      this.currentUserSubject = new BehaviorSubject<object>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      this.authRolesService.token = JSON.stringify(localStorage.getItem('currentUser'))
  }

  public get currentUserValue() : object {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${environment.url}Auth/Login`, { email, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              this.authRolesService.token = user.data.token
              localStorage.setItem('currentUser', JSON.stringify(user.data.token));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/pages/login'])

  }
}
