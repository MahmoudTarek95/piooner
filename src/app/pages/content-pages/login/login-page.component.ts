import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) {
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

      this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
          data => {
            if(data.data == false){
              this.isLoginFailed = true;
              this.spinner.hide();
            }else{
              this.spinner.hide();
                this.router.navigate(['/content/slider']);
            }
          },
          error => {
            if(error.status == 401){
              this.isLoginFailed = true;
              this.spinner.hide();
            }
          });

    // this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
    //   .then((res) => {
    //     this.spinner.hide();
    //     this.router.navigate(['/content/slider']);
    //   })
    //   .catch((err) => {
    //     this.isLoginFailed = true;
    //     this.spinner.hide();
    //     console.log('error: ' + err)
    //     }
    //   );
  }

}
