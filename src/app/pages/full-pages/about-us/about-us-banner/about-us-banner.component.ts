import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-about-us-banner',
  templateUrl: './about-us-banner.component.html',
  styleUrls: ['./about-us-banner.component.scss']
})
export class AboutUsBannerComponent implements OnInit {
  formGroup:FormGroup
  bannerData
  constructor(private fb:FormBuilder, private router:Router, private toasterService:NGXToastrService, private formService:FormService, private cd:ChangeDetectorRef) {
    this.formGroup = fb.group({
      imagePc:['',[Validators.required]],
      imageMobile:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getBannerData()
  }

  setBannerData(bannerData){
    this.formGroup.patchValue({
      imagePc: {
        id:bannerData.pcImage,
        url:bannerData.pcImageUrl
      },
      imageMobile: {
        id:bannerData.mobileImage,
        url:bannerData.mobileImageUrl
      },
    })
  }
  doneUploadingImagePc(event){
    this.formGroup.patchValue({
      imagePc:event
    })
  }
  doneUploadingImageMobile(event){
    this.formGroup.patchValue({
      imageMobile:event
    })
  }

  getBannerData(){
    this.formService.get('Home​/GetAboutUsBanner').subscribe((res:any) => {
      this.bannerData = res.data
      this.cd.markForCheck()
      this.setBannerData(this.bannerData)
    })
  }

  submitForm(){
    let sliderData = {
      pcImage: this.formGroup.controls['imagePc'].value.id,
      mobileImage: this.formGroup.controls['imageMobile'].value.id,
    }

    this.formService.post('Slider/AddSlider',sliderData).subscribe(res => {
      this.formGroup.reset()
      this.router.navigate(['content/about'])
      this.toasterService.TypeSuccess()
    },(error) => {
      if(error.status == 400){
        this.toasterService.TypeWarning(error.error.error.message)
        this.cd.markForCheck()
      }else{
        this.toasterService.TypeError()
      }
    })
  }
  cancel(){
    this.router.navigate(['/content/about'])
  }

}
