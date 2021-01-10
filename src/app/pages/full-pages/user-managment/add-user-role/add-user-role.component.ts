import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.scss']
})
export class AddUserRoleComponent implements OnInit {

  roles = []
  selectedRole
  users = []
  selectedUser
  constructor(private formService:FormService,private router:Router,private toasterService:NGXToastrService) {

  }

  getUsers(){
    this.formService.get('Auth/GetUserDropDown').subscribe((res:any) => {
      this.users = res.data.map(r => {
        return {
          id:r.id,
          name:r.userName
        }
      })
    })
  }
  getRoles(){
    this.formService.get('Auth/GetRolesDropDown').subscribe((res:any) => {
      this.roles = res.data.map(r => {
        return {
          id:r.id,
          name:r.name
        }
      })
    })
  }

  ngOnInit(): void {
    this.getRoles()
    this.getUsers()
  }

  submitForm(){
    if(this.selectedRole && this.selectedUser){
      this.formService.post('Auth/AddUserRole?userId=' + this.selectedUser,[this.selectedRole]).subscribe(res => {
        this.router.navigate(['content/userManagment'])
        this.toasterService.TypeSuccess()
      },(error) => {
        this.toasterService.TypeError()
      })
    }

  }

}
