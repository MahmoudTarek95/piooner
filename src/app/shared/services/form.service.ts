import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
// import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private url = environment.url
  private headers
  constructor(private http:HttpClient) {
    // this.headers = new HttpHeaders({
    //   'LanguageCode':'en',
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Method':'*',
    // })
  }


  get(url){
    return this.http.get(this.url + url).pipe(map(res => res))
  }

  post(url,data){
    return this.http.post(this.url + url,data).pipe(map(res => res))
  }

  put(url,data){
    return this.http.put(this.url + url,data).pipe(map(res => res))
  }
  delete(url){
    return this.http.delete(this.url + url).pipe(map(res => res))
  }

  uploadImage(url,image){
    return this.http.post(this.url + url, image).pipe(map(res => res))
  }
}
