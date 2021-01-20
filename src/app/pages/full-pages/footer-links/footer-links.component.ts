import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { ModalService } from 'app/shared/services/modal.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.scss']
})
export class FooterLinksComponent implements OnInit {

  loadingIndicator
  footerList
  columns

  constructor(private formService:FormService,private toasterService:NGXToastrService,private cd:ChangeDetectorRef,private modalService:ModalService) {
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
  openModal(id){
    const buttons = [
      {
        id:1,
        name:'Delete',
        class:'btn-danger'
      },
      {
        id:2,
        name:'Cancel',
        class:'btn-primary'
      }
    ]
    this.modalService.open(buttons)
    this.modalService.btnId.pipe(first()).subscribe(btnId => {
      if(btnId == 1){
        this.deleteRow(id)
      }else{
        this.modalService.dismissModal()
      }
    })
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
      this.cd.markForCheck()
    })
  }

}
