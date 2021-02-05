import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-add-edit-slider',
  templateUrl: './add-edit-slider.component.html',
  styleUrls: ['./add-edit-slider.component.scss']
})
export class AddEditSliderComponent implements OnInit {
  isEditingMode = false;
  sliderId
  sliderDetails = {}

  active = 1; // Basic Navs

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;

  formGroup

  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {

    this.formGroup = fb.group({
      titleEn: ['',[Validators.required]],
      titleAr:['',[Validators.required]],
      subtitleEn: ['',[Validators.required]],
      subtitleAr:['',[Validators.required]],
      link:['',[Validators.required]],
      sortOrder:['',[Validators.required]],
      imagePc: ['',[Validators.required]],
      imageMobile: ['',[Validators.required]],
    })
   }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.sliderId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getSliderDetails(this.sliderId)
    }
  }

  setSliderData(sliderData){
    this.formGroup.patchValue({
      titleEn: sliderData.titleEn,
      titleAr:sliderData.titleAr,
      subtitleEn: sliderData.subTitleEn,
      subtitleAr:sliderData.subTitleAr,
      link:sliderData.link,
      sortOrder:sliderData.showOrder,
      imagePc: {
        id:sliderData.pcImage,
        url:sliderData.pcImageUrl
      },
      imageMobile: {
        id:sliderData.mobileImage,
        url:sliderData.mobileImageUrl
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

  getSliderDetails(id){
    this.formService.get('Slider/GetSlider/' +id).subscribe((res:any) => {
      if(res){
        this.sliderDetails = res.data
        this.cd.markForCheck()
        this.setSliderData(this.sliderDetails)
      }
    })
  }

  submitForm(){
    if(!this.isEditingMode){
      let sliderData = {
        titleEn: this.formGroup.controls['titleEn'].value,
        titleAr: this.formGroup.controls['titleAr'].value,
        subTitleEn: this.formGroup.controls['subtitleEn'].value,
        subTitleAr: this.formGroup.controls['subtitleAr'].value,
        link: this.formGroup.controls['link'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id,
        mobileImage: this.formGroup.controls['imageMobile'].value.id,
        showOrder: this.formGroup.controls['sortOrder'].value
      }

      this.formService.post('Slider/AddSlider',sliderData).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/slider'])
        this.toasterService.TypeSuccess()
      },(error) => {
        if(error.status == 400){
          this.toasterService.TypeWarning(error.error.error.message)
          this.cd.markForCheck()
        }else{
          this.toasterService.TypeError()
        }
      })
    }else {
      let sliderData = {
        id:this.sliderId,
        titleEn: this.formGroup.controls['titleEn'].value,
        titleAr: this.formGroup.controls['titleAr'].value,
        subTitleEn: this.formGroup.controls['subtitleEn'].value,
        subTitleAr: this.formGroup.controls['subtitleAr'].value,
        link: this.formGroup.controls['link'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id ? this.formGroup.controls['imagePc'].value.id :this.formGroup.controls['imagePc'].value,
        mobileImage: this.formGroup.controls['imageMobile'].value.id ? this.formGroup.controls['imageMobile'].value.id : this.formGroup.controls['imageMobile'].value,
        showOrder: this.formGroup.controls['sortOrder'].value
      }

      this.formService.post('Slider/EditSlider',sliderData).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/slider'])
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
  }
  cancel(){
    this.router.navigate(['/content/slider'])
  }
  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter(id => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }


}
