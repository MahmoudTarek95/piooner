import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {

    this.formGroup = fb.group({
      logo: ['',[Validators.required]],
      logoFooter: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.getLogoDetails()
  }

  setSliderData(sliderData){
    this.formGroup.patchValue({
      logo: {
        id:sliderData.siteLogo,
        url:sliderData.siteLogoUrl
      },
      logoFooter: {
        id:sliderData.footerLogo,
        url:sliderData.footerLogoUrl
      }
    })
  }

  doneUploadingLogo(event){
    this.formGroup.patchValue({
      logo:event
    })
  }
  doneUploadingLogoFooter(event){
    this.formGroup.patchValue({
      logoFooter:event
    })
  }

  getLogoDetails(){
    this.formService.get('Home/GetLogoAdmin').subscribe((res:any) => {
      if(res){
        this.logoDetails = res.data
        this.cd.markForCheck()
        this.setSliderData(this.logoDetails)
      }
    })
  }

  submitForm(){
    let sliderData = {
      siteLogo: this.formGroup.controls['logo'].value.id,
      footerLogo:this.formGroup.controls['logoFooter'].value.id
    }

    this.formService.post('Home/EditLogo',sliderData).subscribe(res => {
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

}
