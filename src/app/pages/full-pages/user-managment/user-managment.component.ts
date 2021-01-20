import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { ModalService } from 'app/shared/services/modal.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss']
})
export class UserManagmentComponent implements OnInit {

  loadingIndicator
  userList
  columns

  constructor(private formService:FormService,private toasterService:NGXToastrService, private cd:ChangeDetectorRef,private modalSerivce:ModalService) {
    this.columns = [
      {
        name:'Username',
        prop:'userName',
        width:150
      },
      {
        name:'Email',
        prop:'email',
        width:150
      },
    ]
  }

  ngOnInit(): void {
    this.getUserList()
  }

  lockUser(id){
    this.formService.post('Auth/UnlockUser/' + id,{}).subscribe(res => {
      this.getUserList()
      this.toasterService.TypeSuccess()
    },error => {
      if(error.status == 400){
        this.toasterService.TypeWarning(error.error.error.message)
      }else{
        this.toasterService.TypeError()
      }
    })
  }

  deleteRow(id){
    this.formService.post('Auth/DeleteUser/' + id, {}).subscribe(res => {
      this.getUserList()
      this.toasterService.TypeSuccess()
    },error => {
      if(error.status == 400){
        this.toasterService.TypeWarning(error.error.error.message)
      }else{
        this.toasterService.TypeError()
      }
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
        this.deleteRow(id)
      }else{
        this.modalSerivce.dismissModal()
      }
    })
  }
  getUserList(){
    this.formService.get('Auth/ListUser').subscribe((res:any) => {
      this.userList = res.data
      this.cd.markForCheck()
    })
  }

}
