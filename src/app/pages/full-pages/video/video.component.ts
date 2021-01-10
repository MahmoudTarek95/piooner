import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoForm:FormGroup;
  videoDetails
  constructor(private fb:FormBuilder,private formService:FormService,private toasterService:NGXToastrService) {
    this.videoForm = fb.group({
      titleEn: ['',[Validators.required]],
      titleAr:['',[Validators.required]],
      descriptionEn: ['',[Validators.required]],
      descriptionAr:['',[Validators.required]],
      link:['',[Validators.required]],
      imagePc:[''],
      imageMobile: [''],
      videoLink: [''],
      isVideo:[true]
    })
  }

  setVideoData(videoData){
    this.videoForm.patchValue({
      titleEn: videoData.titleEn,
      titleAr:videoData.titleAr,
      descriptionEn: videoData.descriptionEn,
      descriptionAr:videoData.descriptionAr,
      link:videoData.link,
      videoLink: videoData.videoLink,
      isVideo:videoData.isVideo
    })
    if(videoData.pcImage && videoData.mobileImage){
      this.videoForm.patchValue({
        imagePc:{
          id:videoData.pcImage,
          url:videoData.pcImageUrl
        },
        imageMobile:{
          id:videoData.mobileImage,
          url:videoData.mobileImageUrl
        }
      })
    }
  }

  doneUploadingImagePc(event){
    this.videoForm.patchValue({
      imagePc:event
    })
  }
  doneUploadingImageMobile(event){
    this.videoForm.patchValue({
      imageMobile:event
    })
  }


  //events starts
  setFocus($event) {
    $event.focus();
  }

  getVideoDetails(){
    this.formService.get('Home/GetAdminVideoSection').subscribe((res:any) => {
      if(res){
        this.videoDetails = res.data
        this.setVideoData(this.videoDetails)
      }
    })
  }

  ngOnInit(): void {
    this.getVideoDetails()
  }

  submitForm(){
    let videoObj ={
      titleEn:this.videoForm.controls['titleEn'].value,
      titleAr:this.videoForm.controls['titleAr'].value,
      descriptionEn:this.videoForm.controls['descriptionEn'].value,
      descriptionAr:this.videoForm.controls['descriptionAr'].value,
      pcImage:this.videoForm.controls['pcImage']?.value.id ? this.videoForm.controls['pcImage'].value.id : '',
      mobileImage:this.videoForm.controls['mobileImage']?.value.id ? this.videoForm.controls['mobileImage'].value.id : '',
      link:this.videoForm.controls['link'].value,
      videoLink:this.videoForm.controls['videoLink']?.value ? this.videoForm.controls['videoLink'].value : '',
      isVideo:this.videoForm.controls['isVideo'].value,
    }
    this.formService.post('Home/EditVideoSection', videoObj).subscribe(res => {
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

}
