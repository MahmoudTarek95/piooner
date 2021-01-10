import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.scss']
})
export class FooterLinksComponent implements OnInit {

  loadingIndicator
  footerList
  columns

  constructor(private formService:FormService,private toasterService:NGXToastrService) {
    this.columns = [
      {
        name:'Title',
        prop:'tiltleEn',
        width:150
      },
      {
        name:'Link',
        prop:'url',
        width:150
      },
    ]
  }

  ngOnInit(): void {
    this.getFooterList()
  }

  deleteRow(id){
    this.formService.post('Home/DeleteFooterLinks/' + id, {}).subscribe(res => {
      this.getFooterList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

  getFooterList(){
    this.formService.get('Home/ListAdminImportantLink').subscribe((res:any) => {
      this.footerList = res.data
    })
  }

}
