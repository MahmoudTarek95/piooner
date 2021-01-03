import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  images = []

  @Input() tempImages
  @Input() imageSrc
  @Input() isMultiable:boolean;
  @Input() formGroup;
  @Input() type:string;
  @Output() deletedGallery:EventEmitter<any> = new EventEmitter();
  @Output() uploadedImage: EventEmitter<any> = new EventEmitter();
  constructor(private formService:FormService) {}

  ngOnInit(): void {
    console.log(this.imageSrc)
    if(this.tempImages && this.tempImages.length > 0){
      this.images = [...this.tempImages]
    }
  }

  onUploadFile(event) {
    if (event.target.files[0].length === 0) return;

    if (this.isMultiable) {
      if (event.target.files && event.target.files[0]) {
        this.uploadImage(event.target.files[0])
        let filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          let reader = new FileReader();
          reader.onload = (event: any) => {
            this.images.push({url:event.target.result});
          };
          reader.readAsDataURL(event.target.files[i]);
        }
        console.log(this.images)
      }

    } else {
      this.uploadImage(event.target.files[0])
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imageSrc = reader.result;
      };
    }
  }
  removeImage(index?,image?){
    if(this.isMultiable){
      this.images.splice(index,1)
      this.tempImages.splice(index,1)
      switch(this.type) {
        case 'galleryPc':
          this.formGroup.controls['galleryPc'].value.splice(index,1)
          console.log(image)
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
      }
      this.imageSrc = ''
    }
  }

  uploadImage(image){
    const formData = new FormData()
    formData.append('files',image)
    this.formService.uploadImage('FileManger/UploadMultipleFiles',formData).subscribe((res:any) => {
      console.log(res)
      this.uploadedImage.emit(res.data[0])
    })
  }

}
