import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-add-edit-cites',
  templateUrl: './add-edit-cites.component.html',
  styleUrls: ['./add-edit-cites.component.scss']
})
export class AddEditCitesComponent implements OnInit {
  isEditingMode = false;
  cityId
  cityDetails = {}

  vActive = 'top'; // Vertical Pills
  active = 1; // Basic Navs
  kActive = 1; // Keep content
  sActive; // Selecing Navs
  disabled = true;
  dActive; // Dynamic Navs

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  selectedProp
  properties
  formGroup

  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {

    this.formGroup = fb.group({
      nameEn: ['',[Validators.required]],
      nameAr:['',[Validators.required]],
      sortOrder:['',[Validators.required]],
      imagePc: ['',[Validators.required]],
      imageMobile: ['',[Validators.required]],
      keywordAr: ['',[Validators.required]],
      keywordEn: ['',[Validators.required]],
      metatagTitleAr: ['',[Validators.required]],
      metatagTitleEn: ['',[Validators.required]],
      metatagDescriptionAr: ['',[Validators.required]],
      metatagDescriptionEn: ['',[Validators.required]],
      bannerPc:['',[Validators.required]],
      bannerMobile:['',[Validators.required]],
    })
   }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.cityId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getCityDetails(this.cityId)
    }
    this.getProperties()
  }

  setCityDetails(cityData){
    this.formGroup.patchValue({
      nameEn: cityData.nameEn,
      nameAr:cityData.nameAr,
      sortOrder:cityData.showOrder,
      keywordAr: cityData.keywordAr,
      keywordEn: cityData.keywordEn,
      metatagTitleAr: cityData.metatagTitleAr,
      metatagTitleEn: cityData.metatagTitleEn,
      metatagDescriptionAr: cityData.metatagDescriptionAr,
      metatagDescriptionEn: cityData.metatagDescriptionEn,
      imagePc: {
        id:cityData.pcImage,
        url:cityData.pcImageUrl
      },
      imageMobile: {
        id:cityData.mobileImage,
        url:cityData.mobileImageUrl
      },
      bannerPc:{
        bannerId:cityData.banner.id,
        id:cityData.banner.pcImage,
        url:cityData.banner.pcImageUrl
      },
      bannerMobile:{
        bannerId:cityData.banner.id,
        id:cityData.banner.mobileImage,
        url:cityData.banner.mobileImageUrl
      },
    })
    this.selectedProp = cityData.propertyTypeId
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

  doneUploadingImagePcBanner(event){
    this.formGroup.patchValue({
      bannerPc:event
    })
  }
  doneUploadingImageMobileBanner(event){
    this.formGroup.patchValue({
      bannerMobile:event
    })
  }

  getCityDetails(id){
    this.formService.get('City/GetCity/' +id).subscribe((res:any) => {
      if(res){
        this.cityDetails = res.data
        this.cd.markForCheck()
        this.setCityDetails(this.cityDetails)
      }
    })
  }

  submitForm(){
    if(!this.isEditingMode){
      let sliderData = {
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        showOrder: this.formGroup.controls['sortOrder'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id,
        mobileImage: this.formGroup.controls['imageMobile'].value.id,
        propertyTypeId:this.selectedProp,
        keywordAr: this.formGroup.controls['keywordAr'].value,
        keywordEn: this.formGroup.controls['keywordEn'].value,
        metatagTitleAr: this.formGroup.controls['metatagTitleAr'].value,
        metatagTitleEn: this.formGroup.controls['metatagTitleEn'].value,
        metatagDescriptionAr: this.formGroup.controls['metatagDescriptionAr'].value,
        metatagDescriptionEn: this.formGroup.controls['metatagDescriptionEn'].value,
        banner: {
          pcImage:this.formGroup.controls['bannerPc'].value.id,
          mobileImage:this.formGroup.controls['bannerMobile'].value.id,
        },
      }

      this.formService.post('City/AddCity',sliderData).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/cites'])
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
        id:this.cityId,
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        showOrder: this.formGroup.controls['sortOrder'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id ? this.formGroup.controls['imagePc'].value.id :this.formGroup.controls['imagePc'].value,
        mobileImage: this.formGroup.controls['imageMobile'].value.id ? this.formGroup.controls['imageMobile'].value.id : this.formGroup.controls['imageMobile'].value,
        propertyTypeId:this.selectedProp,
        keywordAr: this.formGroup.controls['keywordAr'].value,
        keywordEn: this.formGroup.controls['keywordEn'].value,
        metatagTitleAr: this.formGroup.controls['metatagTitleAr'].value,
        metatagTitleEn: this.formGroup.controls['metatagTitleEn'].value,
        metatagDescriptionAr: this.formGroup.controls['metatagDescriptionAr'].value,
        metatagDescriptionEn: this.formGroup.controls['metatagDescriptionEn'].value,
        banner:{
          id: this.formGroup.controls['bannerPc'].value.bannerId ? this.formGroup.controls['bannerPc'].value.bannerId : 0,
          pcImage:this.formGroup.controls['bannerPc'].value.id,
          mobileImage:this.formGroup.controls['bannerMobile'].value.id
        },
      }

      this.formService.post('City/EditCity',sliderData).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/cites'])
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
  getProperties(){
    this.formService.get('City/GetPropertyTypeDropDown').subscribe((res:any) => {
      this.properties = res.data.map(r => {
        return {
          id:r.id,
          name:r.nameEn
        }
      })
    })
  }
  cancel(){
    this.router.navigate(['/content/cites'])
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

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.sActive = 1;
    }
  }

}
