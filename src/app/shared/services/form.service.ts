import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
// import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class FormService {

  private url = environment.url
  private headers
  private token
  constructor(private http:HttpClient) {
    this.token = JSON.parse(localStorage.getItem('currentUser'))
    localStorage.getItem('currentUser')
    this.headers = new HttpHeaders({
      'LanguageCode':'en',
      'Authorization': 'Bearer ' + this.token,
      'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    })
  }


  get(url,type?){
    return this.http.get(this.url + url,{headers:this.headers,responseType:type}).pipe(map(res => res))
  }

  post(url,data){
    return this.http.post(this.url + url,data, {headers:this.headers}).pipe(map(res => res))
  }

  put(url,data){
    return this.http.put(this.url + url,data, {headers:this.headers}).pipe(map(res => res))
  }
  delete(url){
    return this.http.delete(this.url + url, {headers:this.headers}).pipe(map(res => res))
  }

  uploadImage(url,image){
    return this.http.post(this.url + url, image, {headers:this.headers}).pipe(map(res => res))
  }
}
