
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<object>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<object>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() : object {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${environment.url}Auth/Login`, { email, password })
          .pipe(map(user => {
            console.log(user)
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user.data.token));
              this.currentUserSubject.next(user);
              return user;
          }));
  }
}
