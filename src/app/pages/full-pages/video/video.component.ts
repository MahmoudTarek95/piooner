import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  editorEnCounter = 0
  editorArCounter = 0
  constructor(private fb:FormBuilder,private formService:FormService,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {
    this.videoForm = fb.group({
      titleEn: ['',[Validators.required]],
      titleAr:['',[Validators.required]],
      descriptionEn: ['',[Validators.required]],
      descriptionAr:['',[Validators.required]],
      link:['',[Validators.required]],
      imagePc:[''],
      imageMobile: [''],
      videoLink: [''],
      isVideo:[false]
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

  onContentChangedEn(e){
    let text = e.text.split(/\s+/)
    text.splice(text.length -1,1)
    if(text[0] == ''){
      text = []
    }
    this.editorEnCounter = text.length
  }
  onContentChangedAr(e){
    let text = e.text.split(/\s+/)
    text.splice(text.length -1,1)
    if(text[0] == ''){
      text = []
    }
    this.editorArCounter = text.length
  }


  //events starts
  setFocus($event) {
    $event.focus();
  }

  getVideoDetails(){
    this.formService.get('Home/GetAdminVideoSection').subscribe((res:any) => {
      if(res){
        this.videoDetails = res.data
        this.cd.markForCheck()
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
      pcImage:this.videoForm.controls['imagePc'].value.id ? this.videoForm.controls['imagePc'].value.id : '',
      mobileImage:this.videoForm.controls['imageMobile'].value.id ? this.videoForm.controls['imageMobile'].value.id : '',
      link:this.videoForm.controls['link'].value,
      videoLink:this.videoForm.controls['videoLink']?.value ? this.videoForm.controls['videoLink'].value : '',
      isVideo:this.videoForm.controls['isVideo'].value,
    }
    this.formService.post('Home/EditVideoSection', videoObj).subscribe(res => {
      this.toasterService.TypeSuccess()
    },(error) => {
      if(error.status == 400){
        this.toasterService.TypeWarning(error.error.error.message)
      }else{
        this.toasterService.TypeError()
      }
    })
  }

}
