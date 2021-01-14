import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { FormService } from './form.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private formService:FormService) {
    this.formService.get('Home/ListContactUsForm').subscribe((res:any) => {
      localStorage.setItem('contact',JSON.stringify(res.data))
      localStorage.setItem('isMatched','true')
    })
   }

  sendNotification(){
    interval(2*60*1000).subscribe(res => {
       this.formService.get('Home/ListContactUsForm').subscribe((res:any) => {
         let savedList = JSON.parse(localStorage.getItem('contact'))
         if(savedList && savedList[savedList.length -1].id == res.data[res.data.length -1].id){
         }else{
           localStorage.setItem('contact',JSON.stringify(res.data))
          localStorage.setItem('isMatched','false')

         }
       })
    })
    // this.formService.get('Home/ListContactUsForm')
  }
}
