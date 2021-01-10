import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { ROUTES } from 'app/shared/vertical-menu/vertical-menu-routes.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemList = []

  constructor(private formService:FormService) {
    this.itemList = ROUTES
    // this.mapHomeItems()
  }

  // mapHomeItems(){
  //   this.formService.get('Home/Landpage').subscribe((res:any) => {
  //     this.itemList = res.data
  //   })
  // }

  ngOnInit(): void {}


}
