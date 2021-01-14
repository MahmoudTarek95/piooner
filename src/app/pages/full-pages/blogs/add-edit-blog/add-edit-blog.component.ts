import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.scss']
})
export class AddEditBlogComponent implements OnInit,OnChanges {
  blogDetails
  isEditingMode = false
  blogId;
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
  selectedRelated;
  enable = false
  tags = []
  related = []
  constructor(private fb:FormBuilder,private formService:FormService, private activatedRoute:ActivatedRoute, private router:Router, private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {
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
      whatsNumber:['',[Validators.required]],
      phone:['',[Validators.required]],
      galleryPc:[[],[Validators.required]],
      galleryMobile:[[],[Validators.required]],
      isRelatedBlog:[false],
      bannerPc:['',[Validators.required]],
      bannerMobile:['',[Validators.required]],
      sortOrder:['',[Validators.required]],
    })
    this.formGroup.controls.isRelatedBlog.valueChanges.subscribe(res =>{
      this.getRelated()
    })
  }

  getBlogDetails(id){
    this.formService.get('Blog/GetAdminBlog/' + id).subscribe((res:any) => {
      if(res){
        this.blogDetails = res.data
        this.cd.markForCheck()
        this.setBlogData(this.blogDetails)
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

  setBlogData(blogData){
    let gallery = blogData.gallery
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
      nameEn:blogData.nameEn,
      metatagTypeEn:blogData.keywordEn,
      metatagDescriptionEn:blogData.metatagDescriptionEn,
      metatagTitleEn:blogData.metatagTitleEn,
      descriptionEn:blogData.descriptionEn,
      nameAr:blogData.nameAr,
      metatagTypeAr:blogData.keywordAr,
      metatagDescriptionAr:blogData.metatagDescriptionAr,
      metatagTitleAr:blogData.metatagTitleAr,
      descriptionAr:blogData.descriptionAr,
      sortOrder:blogData.showOrder,
      bannerPc:{
        bannerId:blogData.banner.id,
        id:blogData.banner.pcImage,
        url:blogData.banner.pcImageUrl
      },
      bannerMobile:{
        bannerId:blogData.banner.id,
        id:blogData.banner.mobileImage,
        url:blogData.banner.mobileImageUrl
      },
      imagePc:{
        id:blogData.pcImage,
        url:blogData.pcImageUrl
      },
      imageMobile:{
        id:blogData.mobileImage,
        url:blogData.mobileImageUrl
      },
      whatsNumber:blogData.whatsNumer,
      phone:blogData.phone,
      galleryPc:galleryPc,
      galleryMobile:galleryMobile,
      isRelatedBlog:blogData.isRelatedBlog
    })
    this.selectedRelated = blogData.relatedDropDown.map(res => {
      return {
        id:res.id,
        name:res.nameEn
      }
    })
    this.selectedTag = blogData.tags
    this.gallerPcImageMap = galleryPc;
    this.galleryMobileImageMap = galleryMobile

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
  }
  doneUploadingImageGalleryMobile(event){
    this.formGroup.controls.galleryMobile.setValue([...this.formGroup.controls.galleryMobile.value, event])
  }
  getTags(){
    this.formService.get('Blog/TagsDropdown').subscribe((res:any) => {
      this.tags = res.data.map(r => {
        return {
          id:r.id,
          name:r.nameEn
        }
      })
    })
  }
  getRelated(){
    if(this.formGroup.controls.isRelatedBlog.value == true){
      this.formService.get('Blog/BlogsDropdown').subscribe((res:any) => {
        this.related = res.data.map(r => {
          return {
            id:r.id,
            name:r.nameEn
          }
        })
      })
    }else{
      this.formService.get('Project/GetProjectDropdown').subscribe((res:any) => {
        this.related = res.data.map(r => {
          return {
            id:r.id,
            name:r.nameEn
          }
        })
      })
    }
  }

  submitForm(){
    let galleryList = []
    let galleryPc = this.formGroup.controls['galleryPc'].value
    let galleryMobile = this.formGroup.controls['galleryMobile'].value

    let relatedBlogsIds= []
    if(this.selectedRelated){
      relatedBlogsIds = this.selectedRelated.map(p => p.id)
    }
    if(!this.isEditingMode){
      for (let i = 0; i < galleryPc.length; i++) {
        galleryList.push({
          pcImage:galleryPc[i].id,
          mobileImage:galleryMobile[i].id
        })
      }
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
        phone: this.formGroup.controls['phone'].value,
        whatsNumer: this.formGroup.controls['whatsNumber'].value,
        isRelatedBlog: this.formGroup.controls['isRelatedBlog'].value,
        showOrder: this.formGroup.controls['sortOrder'].value,
        gallery: galleryList,
        banner: {
          pcImage:this.formGroup.controls['bannerPc'].value.id,
          mobileImage:this.formGroup.controls['bannerMobile'].value.id,
        },
        tags: this.selectedTag.map(t => t.id),
        related:relatedBlogsIds ? relatedBlogsIds.join() : ''
      }
      if (this.selectedTag.length < 3 || this.selectedTag.length > 5){
        this.toasterService.TypeWarning('Minimum of Tags is 3 and maximum is 5')
      }
      else if(this.selectedRelated &&  (this.selectedRelated.length < 3 || this.selectedRelated.length > 5)){
        this.toasterService.TypeWarning('Minimum of Blogs is 3 and maximum is 5')
      }
      else{
        this.formService.post('Blog/AddBlog',blogObj).subscribe(res => {
          if(res){
            this.formGroup.reset()
            this.router.navigate(['/content/blogs'])
            this.toasterService.TypeSuccess()
          }
        },(error) => {
          this.toasterService.TypeError()
        })
      }
    }else {
      for (let i = 0; i < galleryPc.length; i++) {
        galleryList.push({
          id:galleryPc[i].galleryId ? galleryPc[i].galleryId : 0,
          pcImage:galleryPc[i].id ? galleryPc[i].id : galleryPc[i],
          mobileImage:galleryMobile[i].id ? galleryMobile[i].id : galleryMobile[i]
        })
      }
      let blogObj ={
        id:this.blogId,
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
        phone: this.formGroup.controls['phone'].value,
        whatsNumer: this.formGroup.controls['whatsNumber'].value,
        isRelatedBlog: this.formGroup.controls['isRelatedBlog'].value,
        showOrder: this.formGroup.controls['sortOrder'].value,
        gallery: galleryList,
        banner:{
          id: this.formGroup.controls['bannerPc'].value.bannerId ? this.formGroup.controls['bannerPc'].value.bannerId : 0,
          pcImage:this.formGroup.controls['bannerPc'].value.id,
          mobileImage:this.formGroup.controls['bannerMobile'].value.id
        },
        tags: this.selectedTag.map(t => t.id),
        related:relatedBlogsIds.join()
      }

      if (this.selectedTag.length < 3 || this.selectedTag.length > 5){
        this.toasterService.TypeWarning('Minimum of Tags is 3 and maximum is 5')
      }
      else if(this.selectedRelated.length < 3 || this.selectedRelated.length > 5){
        this.toasterService.TypeWarning('Minimum of Related is 3 and maximum is 5')
      }
      else{
        this.formService.post('Blog/UpdateBlog',blogObj).subscribe(res => {
          if(res){
            this.formGroup.reset()
            this.router.navigate(['/content/blogs'])
          }
          this.toasterService.TypeSuccess()
        },(error) => {
          this.toasterService.TypeError()
        })
      }

    }
  }
  cancel(){
    this.router.navigate(['/content/blogs'])
  }

  deleteGallery(id){
    if(id && id != 0){
      this.formService.post('Blog/DeleteBlogGallery/' + id, {}).subscribe(res => {
        this.toasterService.TypeSuccess()
      },(error) => {
        this.toasterService.TypeError()
      })
    }
  }
  //events starts
  setFocus($event) {
    $event.focus();
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.blogId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getBlogDetails(this.blogId)
    }
    this.getTags()
    this.getRelated()
  }
  ngOnChanges(change:SimpleChanges){
    console.log(change)
  }

}
