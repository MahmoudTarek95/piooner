import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss']
})
export class UserManagmentComponent implements OnInit {

  loadingIndicator
  userList
  columns

  constructor(private formService:FormService,private toasterService:NGXToastrService) {
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

  deleteRow(id){
    this.formService.post('Auth/DeleteUser/' + id, {}).subscribe(res => {
      this.getUserList()
      this.toasterService.TypeSuccess()
    },error => {
      this.toasterService.TypeError()
    })
  }

  getUserList(){
    this.formService.get('Auth/ListUser').subscribe((res:any) => {
      this.userList = res.data
    })
  }

}
