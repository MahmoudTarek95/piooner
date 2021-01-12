import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

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

  tabs = [1, 2, 3, 4, 5, 6];
  counter = this.tabs.length + 1;

  editorEnCounter = 0
  editorArCounter = 0

  formGroup:FormGroup
  projectServiceControlsList
  selectedDeveloper;
  selectedCity;
  selectedProjects;
  mapedProjects = []
  projects = []
  cites = []
  enable = false
  developers = []
  constructor(private fb:FormBuilder,private formService:FormService, private activatedRoute:ActivatedRoute, private router:Router,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {
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
      imagePc:['',[Validators.required]],
      imageMobile:['',[Validators.required]],
      whatsNumber:['',[Validators.required]],
      phone:['',[Validators.required]],
      galleryPc:[[],[Validators.required]],
      galleryMobile:[[],[Validators.required]],
      bannerPc:['',[Validators.required]],
      bannerMobile:['',[Validators.required]],
      price:['',[Validators.required]],
      sortOrder:['',[Validators.required]],
      isCommercial:[false],
      projectService: this.fb.array([])
    })
    if(!this.isEditingMode){
      this.addProject()
    }
  }
  addProject(){
    let usersArray = this.formGroup.controls.projectService as FormArray;
    let arraylen = usersArray.length;

    let newUsergroup: FormGroup = this.fb.group({
      tilteEn:['',[Validators.required]],
      tilteAr:['',[Validators.required]],
      descriptionEn:['',[Validators.required]],
      descriptionAr:['',[Validators.required]]
    })

    usersArray.insert(arraylen, newUsergroup);
  }

  removeFormControl(i) {
    let usersArray = this.formGroup.controls.projectService as FormArray;
    usersArray.removeAt(i);
    console.log(usersArray)
  }

  getProjectDetails(id){
    this.formService.get('Project/GetAdminProject/' + id).subscribe((res:any) => {
      if(res){
        this.projectDetails = res.data
        this.cd.markForCheck()
        this.getRelatedProjects()
        this.setProjectData(this.projectDetails)
      }
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

  setProjectData(projectData){
    let usersArray = this.formGroup.controls.projectService as FormArray;
    usersArray.removeAt(0);
    let arraylen = usersArray.length;
    projectData.projectQuestion.map(res => {
      let newUsergroup: FormGroup = this.fb.group({
        id:[res.id],
        tilteEn:[res.tilteEn,[Validators.required]],
        tilteAr:[res.tilteAr,[Validators.required]],
        descriptionEn:[res.descriptionEn,[Validators.required]],
        descriptionAr:[res.descriptionAr,[Validators.required]]
      })

      usersArray.insert(arraylen, newUsergroup);

    })
    console.log(this.formGroup.controls.projectService)
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
      sortOrder:projectData.showOrder,
      imagePc:{
        id:projectData.pcImage,
        url:projectData.pcImageUrl
      },
      imageMobile:{
        id:projectData.mobileImage,
        url:projectData.mobileImageUrl
      },
      bannerPc:{
        bannerId:projectData.banner.id,
        id:projectData.banner.pcImage,
        url:projectData.banner.pcImageUrl
      },
      bannerMobile:{
        bannerId:projectData.banner.id,
        id:projectData.banner.mobileImage,
        url:projectData.banner.mobileImageUrl
      },
      whatsNumber:projectData.whatsNumer,
      phone:projectData.phone,
      galleryPc:galleryPc,
      galleryMobile:galleryMobile,
      isRelatedBlog:projectData.isRelatedBlog,
      isCommercial:projectData.isCommercial
    })


    this.selectedDeveloper = projectData.develpoerId
    this.selectedCity ={
      id:projectData.cityId,
      name:projectData.cityNameEn,
      isCommercial:projectData.isCommercial
    }
    this.selectedProjects = projectData.projectDropdown.map(r => {
      return{
        id:r.id,
        name:r.nameEn
      }
    })
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
  doneUploadingImageGalleryPc(event){
    this.formGroup.controls.galleryPc.setValue([...this.formGroup.controls.galleryPc.value, event])
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
          name:r.nameEn,
          isCommercial:r.isCommercial
        }
      })
    })
  }
  getRelatedProjects(){
    this.formService.get('Project/GetProjectDropdown').subscribe((res:any) => {
      this.projects = res.data.map(r => {
        return {
          id:r.id,
          name:r.nameEn
        }
      })
    })
  }

  submitForm(){
    // console.log(this.formGroup.controls)
    let projectServiceList = []
    let valuesArray = this.formGroup.controls['projectService']['controls']
    let projectServiceValues = []
    valuesArray.map(f => {
      projectServiceValues.push(f.controls)
    })

    let galleryList = []
    let galleryPc = this.formGroup.controls['galleryPc'].value
    let galleryMobile = this.formGroup.controls['galleryMobile'].value

    let relatedProjectsIds = this.selectedProjects.map(p => p.id)

    if(!this.isEditingMode){
      projectServiceValues.map(c => {
        projectServiceList.push({
          tilteEn: c['tilteEn'].value,
          tilteAr: c['tilteAr'].value,
          descriptionAr: c['descriptionAr'].value,
          descriptionEn: c['descriptionEn'].value,
        })
      })
      for (let i = 0; i < galleryPc.length; i++) {
        galleryList.push({
          pcImage:galleryPc[i].id,
          mobileImage:galleryMobile[i].id
        })
      }
      let projectObj ={
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        pcImage: this.formGroup.controls['imagePc'].value.id,
        locationEn: this.formGroup.controls['locationEn'].value,
        locationAr: this.formGroup.controls['locationAr'].value,
        developerNameEn: this.formGroup.controls['developerNameEn'].value,
        developerNameAr: this.formGroup.controls['developerNameAr'].value,
        sizeEn: this.formGroup.controls['sizeEn'].value,
        sizeAr: this.formGroup.controls['sizeAr'].value,
        propertyTypeEn: this.formGroup.controls['propertyTypeEn'].value,
        propertyTypeAr: this.formGroup.controls['propertyTypeAr'].value,
        mobileImage: this.formGroup.controls['imageMobile'].value.id,
        banner: {
          pcImage:this.formGroup.controls['bannerPc'].value.id,
          mobileImage:this.formGroup.controls['bannerMobile'].value.id,
        },
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
        showOrder: this.formGroup.controls['sortOrder'].value,
        isCommercial:this.formGroup.controls['isCommercial'].value,
        gallery: galleryList,
        develpoerId: this.selectedDeveloper,
        cityId:this.selectedCity.id,
        projectServices:projectServiceList,
        relatedProject: relatedProjectsIds.join()
      }

      if(projectServiceList.length < 3 || projectServiceList.length > 5){
        this.toasterService.TypeWarning('Minimum of Project Service is 3 and maximum is 5')
      }
      else if (relatedProjectsIds.length < 3 || relatedProjectsIds.length > 5){
        this.toasterService.TypeWarning('Minimum of Related Project is 3 and maximum is 5')
      }
      else{
        this.formService.post('Project/AddProject',projectObj).subscribe(res => {
          if(res){
            this.formGroup.reset()
            this.router.navigate(['/content/projects'])
            this.toasterService.TypeSuccess()
          }
        },(error) => {
          this.toasterService.TypeError()
        })
      }
    }else {
      projectServiceValues.map(c => {
        projectServiceList.push({
          id:c['id'] ? c['id'].value : 0,
          tilteEn: c['tilteEn'].value,
          tilteAr: c['tilteAr'].value,
          descriptionAr: c['descriptionAr'].value,
          descriptionEn: c['descriptionEn'].value,
        })
      })
      for (let i = 0; i < galleryPc.length; i++) {
        galleryList.push({
          id:galleryPc[i].galleryId ? galleryPc[i].galleryId : 0,
          pcImage:galleryPc[i].id ? galleryPc[i].id : galleryPc[i],
          mobileImage:galleryMobile[i].id ? galleryMobile[i].id : galleryMobile[i]
        })
      }
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
        banner:{
          id: this.formGroup.controls['bannerPc'].value.bannerId ? this.formGroup.controls['bannerPc'].value.bannerId : 0,
          pcImage:this.formGroup.controls['bannerPc'].value.id,
          mobileImage:this.formGroup.controls['bannerMobile'].value.id
        },
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
        isCommercial:this.formGroup.controls['isCommercial'].value,
        showOrder: this.formGroup.controls['sortOrder'].value,
        gallery: galleryList,
        develpoerId: this.selectedDeveloper,
        cityId:this.selectedCity.id,
        relatedProject: relatedProjectsIds.join(),
        projectQuestion:projectServiceList
      }
      console.log(projectServiceList)

      if(projectServiceList.length < 3 || projectServiceList.length > 5){
        this.toasterService.TypeWarning('Minimum of Project Service is 3 and maximum is 5')
      }
      else if (relatedProjectsIds.length < 3 || relatedProjectsIds.length > 5){
        this.toasterService.TypeWarning('Minimum of Related Project is 3 and maximum is 5')
      }
      else{
        this.formService.post('Project/UpdateProject',projectObj).subscribe(res => {
          if(res){
            this.formGroup.reset()
            this.router.navigate(['/content/projects'])
            this.toasterService.TypeSuccess()
          }
        },(error) => {
          this.toasterService.TypeError()
        })
      }
    }
  }
  cancel(){
    this.router.navigate(['/content/projects'])
  }

  deleteGallery(id){
    if(id && id != 0){
      this.formService.post('Project/DeleteProjectGallery/' + id, {}).subscribe(res => {
        this.toasterService.TypeSuccess()
      },(error) => {
          this.toasterService.TypeError()
        })
    }
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
    this.getRelatedProjects()
    if(this.activatedRoute.snapshot.data.isEdit){
      this.projectId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getProjectDetails(this.projectId)
    }
    this.getDevelopers()
    this.getCites()

  }


}
