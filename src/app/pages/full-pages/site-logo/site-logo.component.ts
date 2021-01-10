import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-site-logo',
  templateUrl: './site-logo.component.html',
  styleUrls: ['./site-logo.component.scss']
})
export class SiteLogoComponent implements OnInit {
  logoDetails = {}
  formGroup

  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService) {

    this.formGroup = fb.group({
      icon: ['',[Validators.required]],
      logo: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.getLogoDetails()
  }

  setSliderData(sliderData){
    this.formGroup.patchValue({
      icon: {
        id:sliderData.siteIcon,
        url:sliderData.siteIconUrl
      },
      logo: {
        id:sliderData.siteLogo,
        url:sliderData.siteLogoUrl
      }
    })
  }

  doneUploadingLogo(event){
    this.formGroup.patchValue({
      logo:event
    })
  }
  doneUploadingIcon(event){
    this.formGroup.patchValue({
      icon:event
    })
  }

  getLogoDetails(){
    this.formService.get('Home/GetLogoAdmin').subscribe((res:any) => {
      if(res){
        this.logoDetails = res.data
        this.setSliderData(this.logoDetails)
      }
    })
  }

  submitForm(){
    let sliderData = {
      siteLogo: this.formGroup.controls['logo'].value.id,
      siteIcon: this.formGroup.controls['icon'].value.id
    }

    this.formService.post('Home/EditLogo',sliderData).subscribe(res => {
      this.formGroup.reset()
      this.router.navigate(['content/logo'])
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

}
