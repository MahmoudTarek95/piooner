import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'app/shared/services/form.service';
import { ModalService } from 'app/shared/services/modal.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {
  developersList
  columns

  constructor(private formService:FormService,private toasterService:NGXToastrService,private cd:ChangeDetectorRef,private modalSerivce:ModalService,private router:Router) {
    this.columns = [
      {
        name:'Name',
        prop:'nameEn',
        width:150
      }
    ]
  }

  ngOnInit(): void {
    this.getDevelopersList()
  }
  deleteDeveloper(id){
    this.formService.post('Developer/DeleteDeveloper/' + id, {}).subscribe(res => {
      this.getDevelopersList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
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
    this.modalSerivce.open(buttons)
    this.modalSerivce.btnId.pipe(first()).subscribe(btnId => {
      if(btnId == 1){
        this.deleteDeveloper(id)
      }else{
        this.modalSerivce.dismissModal()
      }
    })
  }
  preview(url){
    window.open(url, '_blank')
  }
  getDevelopersList(){
    this.formService.get('Developer/ListDevelopers').subscribe((res:any) => {
      this.developersList = res.data
      this.cd.markForCheck()
    })
  }

}
