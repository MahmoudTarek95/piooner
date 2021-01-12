import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  loadingIndicator
  aboutList
  columns

  constructor(private formService:FormService,private cd:ChangeDetectorRef) {
    this.columns = [
      {
        name:'Title',
        prop:'titleEN',
        width:150
      },
      {
        name:'Description',
        prop:'descriptionEn',
        width:150
      },
    ]
  }

  ngOnInit(): void {
    this.getAboutList()
  }


  getAboutList(){
    this.formService.get('Home/ListAdminAboutUs').subscribe((res:any) => {
      this.aboutList = res.data
      this.cd.markForCheck()
    })
  }

}
