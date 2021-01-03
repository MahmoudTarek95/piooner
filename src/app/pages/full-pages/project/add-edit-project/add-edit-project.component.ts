import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {

  projectDetails
  isEditingMode = false
  projectId;
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

  formGroup:FormGroup
  selectedDeveloper;
  selectedCity;
  cites = []
  enable = false
  developers = []
  constructor(private fb:FormBuilder,private formService:FormService, private activatedRoute:ActivatedRoute, private router:Router) {
    this.formGroup = fb.group({
      nameEn:['',[Validators.required]],
      metatagTypeEn:['',[Validators.required]],
      metatagDescriptionEn:['',[Validators.required]],
      metatagTitleEn:['',[Validators.required]],
      descriptionEn:['',[Validators.required]],
      developerNameEn:['',[Validators.required]],
      sizeEn:['',[Validators.required]],
      propertyTypeEn:['',[Validators.required]],
      propertyTypeAr:['',[Validators.required]],
      locationEn:['',[Validators.required]],
      locationAr:['',[Validators.required]],
      nameAr:['',[Validators.required]],
      metatagTypeAr:['',[Validators.required]],
      metatagDescriptionAr:['',[Validators.required]],
      metatagTitleAr:['',[Validators.required]],
      descriptionAr:['',[Validators.required]],
      developerNameAr:['',[Validators.required]],
      sizeAr:['',[Validators.required]],
      sortOrder:['',[Validators.required]],
      imagePc:['',[Validators.required]],
      imageMobile:['',[Validators.required]],
      whatsNumber:['',[Validators.required]],
      phone:['',[Validators.required]],
      galleryPc:[[],[Validators.required]],
      galleryMobile:[[],[Validators.required]],
      price:['',[Validators.required]],

    })
  }

  getProjectDetails(id){
    this.formService.get('Project/GetAdminProject/' + id).subscribe((res:any) => {
      if(res){
        this.projectDetails = res.data
        this.setProjectData(this.projectDetails)
      }
    })
  }

  setProjectData(projectData){
    let gallery = projectData.gallery
    let galleryPc = []
    let galleryMobile = []
    gallery.map(g => {
      galleryPc.push({
        galleryId:g.id,
        id:g.pcImage,
        url:g.pcImageUrl
      })
      galleryMobile.push({
        galleryId:g.id,
        id:g.mobileImage,
        url:g.mobileImageUrl
      })
    })
    this.formGroup.patchValue({
      nameEn:projectData.nameEn,
      metatagTypeEn:projectData.keywordEn,
      metatagDescriptionEn:projectData.metatagDescriptionEn,
      metatagTitleEn:projectData.metatagTitleEn,
      descriptionEn:projectData.descriptionEn,
      nameAr:projectData.nameAr,
      metatagTypeAr:projectData.keywordAr,
      metatagDescriptionAr:projectData.metatagDescriptionAr,
      metatagTitleAr:projectData.metatagTitleAr,
      descriptionAr:projectData.descriptionAr,
      locationEn: projectData.locationEn,
      locationAr: projectData.locationAr,
      developerNameEn: projectData.developerNameEn,
      developerNameAr: projectData.developerNameAr,
      sizeEn: projectData.sizeEn,
      sizeAr: projectData.sizeAr,
      propertyTypeEn: projectData.propertyTypeEn,
      propertyTypeAr: projectData.propertyTypeAr,
      price: projectData.price,
      imagePc:{
        id:projectData.pcImage,
        url:projectData.pcImageUrl
      },
      imageMobile:{
        id:projectData.mobileImage,
        url:projectData.mobileImageUrl
      },
      whatsNumber:projectData.whatsNumer,
      phone:projectData.phone,
      galleryPc:galleryPc,
      galleryMobile:galleryMobile,
      isRelatedBlog:projectData.isRelatedBlog
    })
    this.selectedDeveloper = projectData.develpoerId
    this.selectedCity = projectData.cityId
    this.gallerPcImageMap = galleryPc;
    this.galleryMobileImageMap = galleryMobile

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
  doneUploadingImageGalleryPc(event){
    this.formGroup.controls.galleryPc.setValue([...this.formGroup.controls.galleryPc.value, event])
    if(this.isEditingMode){
    this.formGroup.controls.galleryPc.value
    }
  }
  doneUploadingImageGalleryMobile(event){
    this.formGroup.controls.galleryMobile.setValue([...this.formGroup.controls.galleryMobile.value, event])
  }
  getDevelopers(){
    this.formService.get('Project/GetDeveloperDropDown').subscribe((res:any) => {
      this.developers = res.data.map(r => {
        return {
          id:r.id,
          name:r.nameEn
        }
      })
    })
  }
  getCites(){
    this.formService.get('Project/GetCityDropDown').subscribe((res:any) => {
      this.cites = res.data.map(r => {
        return {
          id:r.id,
          name:r.nameEn
        }
      })
    })
  }

  submitForm(){
    console.log(this.selectedDeveloper)
    console.log(this.selectedCity)

    let galleryList = []
    let galleryPc = this.formGroup.controls['galleryPc'].value
    let galleryMobile = this.formGroup.controls['galleryMobile'].value

    if(!this.isEditingMode){
      for (let i = 0; i < galleryPc.length; i++) {
        galleryList.push({
          pcImage:galleryPc[i],
          mobileImage:galleryMobile[i]
        })
      }
      let projectObj ={
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        pcImage: this.formGroup.controls['imagePc'].value,
        locationEn: this.formGroup.controls['locationEn'].value,
        locationAr: this.formGroup.controls['locationAr'].value,
        developerNameEn: this.formGroup.controls['developerNameEn'].value,
        developerNameAr: this.formGroup.controls['developerNameAr'].value,
        sizeEn: this.formGroup.controls['sizeEn'].value,
        sizeAr: this.formGroup.controls['sizeAr'].value,
        propertyTypeEn: this.formGroup.controls['propertyTypeEn'].value,
        propertyTypeAr: this.formGroup.controls['propertyTypeAr'].value,
        mobileImage: this.formGroup.controls['imageMobile'].value,
        descriptionEn: this.formGroup.controls['descriptionEn'].value,
        descriptionAr: this.formGroup.controls['descriptionAr'].value,
        keywordAr: this.formGroup.controls['metatagTypeAr'].value,
        keywordEn: this.formGroup.controls['metatagTypeEn'].value,
        metatagTitleAr: this.formGroup.controls['metatagTitleAr'].value,
        metatagTitleEn: this.formGroup.controls['metatagTitleEn'].value,
        metatagDescriptionAr: this.formGroup.controls['metatagDescriptionAr'].value,
        metatagDescriptionEn: this.formGroup.controls['metatagDescriptionEn'].value,
        phone: this.formGroup.controls['phone'].value,
        whatsNumer: this.formGroup.controls['whatsNumber'].value,
        price: this.formGroup.controls['price'].value,
        gallery: galleryList,
        develpoerId: this.selectedDeveloper,
        cityId:this.selectedCity
      }

      this.formService.post('Project/AddProject',projectObj).subscribe(res => {
        if(res){
          this.formGroup.reset()
          this.router.navigate(['/content/projects'])
        }
      })
    }else {
      for (let i = 0; i < galleryPc.length; i++) {
        galleryList.push({
          id:galleryPc[i].galleryId ? galleryPc[i].galleryId : 0,
          pcImage:galleryPc[i].id ? galleryPc[i].id : galleryPc[i],
          mobileImage:galleryMobile[i].id ? galleryMobile[i].id : galleryMobile[i]
        })
      }
      console.log(galleryList)
      console.log(galleryPc,galleryMobile)
      let projectObj ={
        id:this.projectId,
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id ? this.formGroup.controls['imagePc'].value.id : this.formGroup.controls['imagePc'].value,
        locationEn: this.formGroup.controls['locationEn'].value,
        locationAr: this.formGroup.controls['locationAr'].value,
        developerNameEn: this.formGroup.controls['developerNameEn'].value,
        developerNameAr: this.formGroup.controls['developerNameAr'].value,
        sizeEn: this.formGroup.controls['sizeEn'].value,
        sizeAr: this.formGroup.controls['sizeAr'].value,
        propertyTypeEn: this.formGroup.controls['propertyTypeEn'].value,
        propertyTypeAr: this.formGroup.controls['propertyTypeAr'].value,
        mobileImage: this.formGroup.controls['imageMobile'].value.id ? this.formGroup.controls['imageMobile'].value.id : this.formGroup.controls['imageMobile'].value,
        descriptionEn: this.formGroup.controls['descriptionEn'].value,
        descriptionAr: this.formGroup.controls['descriptionAr'].value,
        keywordAr: this.formGroup.controls['metatagTypeAr'].value,
        keywordEn: this.formGroup.controls['metatagTypeEn'].value,
        metatagTitleAr: this.formGroup.controls['metatagTitleAr'].value,
        metatagTitleEn: this.formGroup.controls['metatagTitleEn'].value,
        metatagDescriptionAr: this.formGroup.controls['metatagDescriptionAr'].value,
        metatagDescriptionEn: this.formGroup.controls['metatagDescriptionEn'].value,
        phone: this.formGroup.controls['phone'].value,
        whatsNumer: this.formGroup.controls['whatsNumber'].value,
        price: this.formGroup.controls['price'].value,
        gallery: galleryList,
        develpoerId: this.selectedDeveloper,
        cityId:this.selectedCity
      }

      this.formService.post('Project/UpdateProject',projectObj).subscribe(res => {
        if(res){
          this.formGroup.reset()
          this.router.navigate(['/content/projects'])
        }
      })
    }
  }

  deleteGallery(id){
    this.formService.post('Project/DeleteProjectGallery/' + id, {}).subscribe(res => res)
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
      this.projectId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getProjectDetails(this.projectId)
    }
    this.getDevelopers()
    this.getCites()
  }


}
