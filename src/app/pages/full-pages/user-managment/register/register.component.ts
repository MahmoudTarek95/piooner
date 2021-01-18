import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  contactData = {}
  showPassword = false
  showPasswordConfirm = false
  constructor(private fb:FormBuilder,private formService:FormService, private router:Router,private toasterService:NGXToastrService) {
    this.registerForm = fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
  }

  submitForm(){
    let contactObj = {
      userName:this.registerForm.controls['userName'].value,
      email:this.registerForm.controls['email'].value,
      password:this.registerForm.controls['password'].value,
      confirmPassword:this.registerForm.controls['confirmPassword'].value
    }

    this.formService.post('Auth/Register',contactObj).subscribe(res => {
      this.router.navigate(['content/userManagment'])
      this.toasterService.TypeSuccess()
    },(resError) => {
      if(resError.status == 400){
        this.toasterService.TypeWarning(resError.error.error.message)
      }else {
        this.toasterService.TypeError()
      }
    })
  }

}
