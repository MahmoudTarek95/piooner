import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  sizeValidationPc = false
  sizeValidationMobile = false
  @Input() images = []
  @Input() tempImages
  @Input() imageSrc
  @Input() isMultiable:boolean;
  @Input() formGroup;
  @Input() type:string;
  @Output() deletedGallery:EventEmitter<any> = new EventEmitter();
  @Output() uploadedImage: EventEmitter<any> = new EventEmitter();
  constructor(private formService:FormService) {}

  ngOnInit(): void {
    if(this.tempImages && this.tempImages.length > 0){
      this.images = [...this.tempImages]
    }
  }

  onUploadFile(event) {

    if (event.target.files[0].length === 0) return;
    if (this.type == 'imagePc' || this.type == 'bannerPc' || this.type == 'galleryPc'){}
    switch(this.type){
      case 'imagePc' :
      case 'bannerPc' :
      case 'galleryPc' :
        if(event.target.files[0].size < 200000){
          this.sizeValidationPc = false
          if (this.isMultiable) {
            if (event.target.files && event.target.files[0]) {
              let filesAmount = event.target.files.length;

              for (let i = 0; i < filesAmount; i++) {
                let reader = new FileReader();
                reader.onload = (e: any) => {

                  // this.images.push({url:e.target.result});
                  this.uploadImage(event.target.files[0],e.target.result)
                };
                reader.readAsDataURL(event.target.files[i]);
              }

            }

          } else {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (_event) => {

              // this.imageSrc = reader.result;
              this.uploadImage(event.target.files[0],reader.result)

            };
          }
        }else {
          this.sizeValidationPc = true
        }

        break;
      case 'imageMobile':
      case 'bannerMobile':
      case 'galleryMobile':
      case 'logo':
        if(event.target.files[0].size < 50000){
          this.sizeValidationMobile = false
          if (this.isMultiable) {
            if (event.target.files && event.target.files[0]) {
              let filesAmount = event.target.files.length;

              for (let i = 0; i < filesAmount; i++) {
                let reader = new FileReader();
                reader.onload = (e: any) => {

                  // this.images.push({url:e.target.result});
                  this.uploadImage(event.target.files[0],e.target.result)
                };
                reader.readAsDataURL(event.target.files[i]);
              }

            }

          } else {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (_event) => {

              // this.imageSrc = reader.result;
              this.uploadImage(event.target.files[0],reader.result)

            };
          }
        }else {
          this.sizeValidationMobile = true
        }
        break;
    }

  }
  removeImage(index?,image?){

    if(this.isMultiable){
      this.images.splice(index,1)
      this.tempImages.splice(index,1)
      switch(this.type) {
        case 'galleryPc':
          this.formGroup.controls['galleryPc'].value.splice(index,1)
          if(image){
            this.deletedGallery.emit(image.galleryId)
          }
          break;
        case 'galleryMobile':
          this.formGroup.controls['galleryMobile'].value.splice(index,1)
          if(image){
            this.deletedGallery.emit(image.galleryId)
          }
          break;
      }
    }else{
      switch(this.type){
        case 'imagePc':
          this.formGroup.controls['imagePc'].setValue('')
          break;
        case 'imageMobile':
          this.formGroup.controls['imageMobile'].setValue('')
          break;
        case 'logo':
          this.formGroup.controls['logo'].setValue('')
          break;
        case 'bannerPc':
          this.formGroup.controls['bannerPc'].setValue('')
          break;
        case 'bannerMobile':
          this.formGroup.controls['bannerMobile'].setValue('')
          break;
      }
      this.imageSrc = {}
    }
  }

  uploadImage(image,url?){
    const formData = new FormData()
    formData.append('files',image)
    this.formService.uploadImage('FileManger/UploadMultipleFiles',formData).subscribe((res:any) => {
      this.uploadedImage.emit({id:res.data[0],url:url})
    })
  }

}
