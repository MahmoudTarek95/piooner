import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itemList = []

  constructor(private formService:FormService,private cd:ChangeDetectorRef) {
    this.mapHomeItems()
  }

  mapHomeItems(){
    this.formService.get('Home/Landpage').subscribe((res:any) => {
      this.itemList = res.data
      this.cd.markForCheck()
      console.log(this.itemList)
    })
  }

  ngOnInit(): void {}


}
