import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formGroup:FormGroup
  userId
  showPasswordOld = false
  showPasswordNew = false
  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute, private formService:FormService,private toastrService:NGXToastrService) {
    this.formGroup = fb.group({
      oldPassword:['',[Validators.required]],
      newPassword:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')
  }

  submitForm(){
    let changeObj = {
      userId:this.userId,
      newPassword:this.formGroup.controls['newPassword'].value,
      currentPassword:this.formGroup.controls['oldPassword'].value
    }

    this.formService.post('Auth/ChangePassword', changeObj).subscribe(res => {
      this.toastrService.TypeSuccess()
    },error => {
      if(error.status == 400){
        this.toastrService.TypeWarning(error.error.error.message)
      }else{
        this.toastrService.TypeError()
      }
    })

  }

}
