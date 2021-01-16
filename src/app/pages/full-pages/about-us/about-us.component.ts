import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  loadingIndicator
  aboutList
  columns

  constructor(private formService:FormService,private cd:ChangeDetectorRef,private toastrService:NGXToastrService) {
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

  showAboutUs(){
    this.formService.post('Home/ShowAboutUsSection',{}).subscribe(res => {
      this.toastrService.TypeSuccess()
    }, error => {
      this.toastrService.TypeError()
    })
  }


  getAboutList(){
    this.formService.get('Home/ListAdminAboutUs').subscribe((res:any) => {
      this.aboutList = res.data
      this.cd.markForCheck()
    })
  }

}
