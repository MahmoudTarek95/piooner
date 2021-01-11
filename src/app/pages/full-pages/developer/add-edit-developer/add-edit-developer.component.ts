import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-add-edit-developer',
  templateUrl: './add-edit-developer.component.html',
  styleUrls: ['./add-edit-developer.component.scss']
})
export class AddEditDeveloperComponent implements OnInit {
  developerDetails
  isEditingMode = false
  developerId;
  gallerPcImageMap;
  galleryMobileImageMap

  vActive = 'top'; // Vertical Pills
  active = 1; // Basic Navs
  kActive = 1; // Keep content
  sActive; // Selecing Navs
  disabled = true;
  dActive; // Dynamic Navs

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;

  editorEnCounter = 0
  editorArCounter = 0

  formGroup:FormGroup
  selectedTag;
  enable = false
  tags = []
  constructor(private fb:FormBuilder,private formService:FormService, private activatedRoute:ActivatedRoute, private router:Router,private toasterService:NGXToastrService) {
    this.formGroup = fb.group({
      nameEn:['',[Validators.required]],
      metatagTypeEn:['',[Validators.required]],
      metatagDescriptionEn:['',[Validators.required]],
      metatagTitleEn:['',[Validators.required]],
      descriptionEn:['',[Validators.required]],
      nameAr:['',[Validators.required]],
      metatagTypeAr:['',[Validators.required]],
      metatagDescriptionAr:['',[Validators.required]],
      metatagTitleAr:['',[Validators.required]],
      descriptionAr:['',[Validators.required]],
      imagePc:['',[Validators.required]],
      imageMobile:['',[Validators.required]],
      logo:['',[Validators.required]],
      sortOrder:['',[Validators.required]],
    })
  }

  getDeveloperDetails(id){
    this.formService.get('Developer/GetAdminDeveloper/' + id).subscribe((res:any) => {
      if(res){
        this.developerDetails = res.data
        this.setDeveloperData(this.developerDetails)
      }
    })
  }

  onContentChangedEn(e){
    this.editorEnCounter = e.text.length -1
  }
  onContentChangedAr(e){
    this.editorArCounter = e.text.length -1
  }

  setDeveloperData(developerData){
    this.formGroup.patchValue({
      nameEn:developerData.nameEn,
      metatagTypeEn:developerData.keywordEn,
      metatagDescriptionEn:developerData.metatagDescriptionEn,
      metatagTitleEn:developerData.metatagTitleEn,
      descriptionEn:developerData.descriptionEn,
      nameAr:developerData.nameAr,
      metatagTypeAr:developerData.keywordAr,
      metatagDescriptionAr:developerData.metatagDescriptionAr,
      metatagTitleAr:developerData.metatagTitleAr,
      descriptionAr:developerData.descriptionAr,
      showOrder:developerData.sortOrder,
      imagePc:{
        id:developerData.pcImage,
        url:developerData.pcImageUrl
      },
      imageMobile:{
        id:developerData.mobileImage,
        url:developerData.mobileImageUrl
      },
      logo:{
        id:developerData.logo,
        url:developerData.logoUrl
      }
    })

  }
  doneUploadingLogo(event){
    this.formGroup.patchValue({
      logo:event
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

  submitForm(){
    if(!this.isEditingMode){
      let blogObj ={
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id,
        mobileImage: this.formGroup.controls['imageMobile'].value.id,
        descriptionEn: this.formGroup.controls['descriptionEn'].value,
        descriptionAr: this.formGroup.controls['descriptionAr'].value,
        keywordAr: this.formGroup.controls['metatagTypeAr'].value,
        keywordEn: this.formGroup.controls['metatagTypeEn'].value,
        metatagTitleAr: this.formGroup.controls['metatagTitleAr'].value,
        metatagTitleEn: this.formGroup.controls['metatagTitleEn'].value,
        metatagDescriptionAr: this.formGroup.controls['metatagDescriptionAr'].value,
        metatagDescriptionEn: this.formGroup.controls['metatagDescriptionEn'].value,
        logo: this.formGroup.controls['logo'].value.id,
        showOrder: this.formGroup.controls['sortOrder'].value,
      }

      this.formService.post('Developer/AddDeveloper',blogObj).subscribe(res => {
        if(res){
          this.formGroup.reset()
          this.router.navigate(['/content/developers'])
          this.toasterService.TypeSuccess()
        }
      },(error) => {
        this.toasterService.TypeError()
      })
    }else {
      let blogObj ={
        id:this.developerId,
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id ? this.formGroup.controls['imagePc'].value.id : this.formGroup.controls['imagePc'].value,
        mobileImage: this.formGroup.controls['imageMobile'].value.id ? this.formGroup.controls['imageMobile'].value.id : this.formGroup.controls['imageMobile'].value,
        descriptionEn: this.formGroup.controls['descriptionEn'].value,
        descriptionAr: this.formGroup.controls['descriptionAr'].value,
        keywordAr: this.formGroup.controls['metatagTypeAr'].value,
        keywordEn: this.formGroup.controls['metatagTypeEn'].value,
        metatagTitleAr: this.formGroup.controls['metatagTitleAr'].value,
        metatagTitleEn: this.formGroup.controls['metatagTitleEn'].value,
        metatagDescriptionAr: this.formGroup.controls['metatagDescriptionAr'].value,
        metatagDescriptionEn: this.formGroup.controls['metatagDescriptionEn'].value,
        logo: this.formGroup.controls['logo'].value.id,
        showOrder: this.formGroup.controls['sortOrder'].value,
      }

      this.formService.post('Developer/EditDeveloper',blogObj).subscribe(res => {
        if(res){
          this.formGroup.reset()
          this.router.navigate(['/content/developers'])
          this.toasterService.TypeSuccess()
        }
      },(error) => {
        this.toasterService.TypeError()
      })
    }
  }

  cancel(){
    this.router.navigate(['/content/developers'])
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
  //events starts
  setFocus($event) {
    $event.focus();
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.developerId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getDeveloperDetails(this.developerId)
    }
  }

}
