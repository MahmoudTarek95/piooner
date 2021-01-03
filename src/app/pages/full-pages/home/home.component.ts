import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isEditingMode = false;
  sliderId
  contactData = {}
  socialData;
  videoData

  vActive = 'top'; // Vertical Pills
  active = 1; // Basic Navs
  kActive = 1; // Keep content
  sActive; // Selecing Navs
  disabled = true;
  dActive; // Dynamic Navs

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;

  contactForm
  socialForm
  videoForm

  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute) {

  //   this.contactForm = fb.group({
  //     mobileNumber: ['',[Validators.required]],
  //     hotline:['',[Validators.required]],
  //     locationEn: ['',[Validators.required]],
  //     locationAr:['',[Validators.required]],
  //     email:['',[Validators.required]]
  //   })
  //   this.socialForm = fb.group({
  //     socialData:[[],[Validators.required]]
  //   })
  //   this.videoForm = fb.group({
  //     titleEn: ['',[Validators.required]],
  //     titleAr:['',[Validators.required]],
  //     descriptionEn: ['',[Validators.required]],
  //     descriptionAr:['',[Validators.required]],
  //     imagePc:['',[Validators.required]],
  //     imageMobile: ['',[Validators.required]],
  //     link:['',[Validators.required]],
  //     videoLink: ['',[Validators.required]],
  //     isVideo:[true,[Validators.required]]
  //   })
  }

  ngOnInit(): void {
    // if(this.activatedRoute.snapshot.data.isEdit){
    //   this.sliderId = this.activatedRoute.snapshot.paramMap.get('id')
    //   this.isEditingMode = true
    //   this.getSliderDetails(this.sliderId)
    // }
  }

  // setContactData(contactData){
  //   this.contactForm.patchValue({
  //     mobileNumber: contactData.mobileNumber,
  //     hotline:contactData.hotline,
  //     locationEn: contactData.locationEn,
  //     locationAr:contactData.locationAr,
  //     email:contactData.email
  //   })
  // }
  // setSocialData(socialData){
  //   this.contactForm.patchValue({
  //    socialData:socialData
  //   })
  // }
  // setVideoData(videoData){
  //   this.contactForm.patchValue({
  //     titleEn: videoData.titleEn,
  //     titleAr:videoData.titleAr,
  //     descriptionEn: videoData.descriptionEn,
  //     descriptionAr:videoData.descriptionAr,
  //     imagePc:{
  //       id:videoData.pcImage,
  //       url:videoData.pcImageUrl
  //     },
  //     imageMobile:{
  //       id:videoData.mobileImage,
  //       url:videoData.mobileImageUrl
  //     },
  //     link:videoData.link,
  //     videoLink: videoData.videoLink,
  //     isVideo:videoData.isVideo
  //   })
  // }

  // doneUploadingImagePc(event){
  //   this.videoForm.patchValue({
  //     imagePc:event
  //   })
  // }
  // doneUploadingImageMobile(event){
  //   this.videoForm.patchValue({
  //     imageMobile:event
  //   })
  // }

  //   //events starts
  // setFocus($event) {
  //   $event.focus();
  // }

  // getContactData(id){
  //   this.formService.get('​Home​/GetAdminHomeContact').subscribe((res:any) => {
  //     if(res){
  //       this.contactData = res.data
  //       this.getContactData(this.contactData)
  //     }
  //   })
  // }
  // getSocialData(id){
  //   this.formService.get('Slider/GetSlider/' +id).subscribe((res:any) => {
  //     if(res){
  //       this.sliderDetails = res.data
  //       this.setSliderData(this.sliderDetails)
  //     }
  //   })
  // }
  // getSliderDetails(id){
  //   this.formService.get('Slider/GetSlider/' +id).subscribe((res:any) => {
  //     if(res){
  //       this.sliderDetails = res.data
  //       this.setSliderData(this.sliderDetails)
  //     }
  //   })
  // }

  // submitForm(){
  //   if(!this.isEditingMode){
  //     let sliderData = {
  //       titleEn: this.formGroup.controls['titleEn'].value,
  //       titleAr: this.formGroup.controls['titleAr'].value,
  //       subTitleEn: this.formGroup.controls['subtitleEn'].value,
  //       subTitleAr: this.formGroup.controls['subtitleAr'].value,
  //       link: this.formGroup.controls['link'].value,
  //       pcImage: this.formGroup.controls['imagePc'].value,
  //       mobileImage: this.formGroup.controls['imageMobile'].value
  //     }

  //     this.formService.post('Slider/AddSlider',sliderData).subscribe(res => {
  //       this.formGroup.reset()
  //       this.router.navigate(['content/slider'])
  //     })
  //   }else {
  //     let sliderData = {
  //       id:this.sliderId,
  //       titleEn: this.formGroup.controls['titleEn'].value,
  //       titleAr: this.formGroup.controls['titleAr'].value,
  //       subTitleEn: this.formGroup.controls['subtitleEn'].value,
  //       subTitleAr: this.formGroup.controls['subtitleAr'].value,
  //       link: this.formGroup.controls['link'].value,
  //       pcImage: this.formGroup.controls['imagePc'].value.id ? this.formGroup.controls['imagePc'].value.id :this.formGroup.controls['imagePc'].value,
  //       mobileImage: this.formGroup.controls['imageMobile'].value.id ? this.formGroup.controls['imageMobile'].value.id : this.formGroup.controls['imageMobile'].value
  //     }

  //     this.formService.post('Slider/EditSlider',sliderData).subscribe(res => {
  //       this.formGroup.reset()
  //       this.router.navigate(['content/slider'])
  //     })
  //   }
  // }

  // close(event: MouseEvent, toRemove: number) {
  //   this.tabs = this.tabs.filter(id => id !== toRemove);
  //   event.preventDefault();
  //   event.stopImmediatePropagation();
  // }

  // add(event: MouseEvent) {
  //   this.tabs.push(this.counter++);
  //   event.preventDefault();
  // }

  // onNavChange(changeEvent: NgbNavChangeEvent) {
  //   if (changeEvent.nextId === 3) {
  //     changeEvent.preventDefault();
  //   }
  // }

  // toggleDisabled() {
  //   this.disabled = !this.disabled;
  //   if (this.disabled) {
  //     this.sActive = 1;
  //   }
  // }

}
