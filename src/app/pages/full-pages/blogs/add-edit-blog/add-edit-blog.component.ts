import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.scss']
})
export class AddEditBlogComponent implements OnInit {
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

  formGroup:FormGroup
  selectedTag;
  enable = false
  tags = []
  constructor(private fb:FormBuilder,private formService:FormService, private activatedRoute:ActivatedRoute, private router:Router) {
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
      sortOrder:['',[Validators.required]],
      imagePc:['',[Validators.required]],
      imageMobile:['',[Validators.required]],
      whatsNumber:['',[Validators.required]],
      phone:['',[Validators.required]],
      galleryPc:[[],[Validators.required]],
      galleryMobile:[[],[Validators.required]],
      isRelatedBlog:[false,[Validators.required]]
    })
  }

  getBlogDetails(id){
    this.formService.get('Blog/GetAdminBlog/' + id).subscribe((res:any) => {
      if(res){
        this.blogDetails = res.data
        this.setBlogData(this.blogDetails)
      }
    })
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
      // sortOrder:['',[Validators.required]],
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
    this.selectedTag = blogData.tags
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

  submitForm(){
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
      let blogObj ={
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        showOrder: 0,
        pcImage: this.formGroup.controls['imagePc'].value,
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
        isRelatedBlog: this.formGroup.controls['isRelatedBlog'].value,
        gallery: galleryList,
        tags: this.selectedTag.map(t => t.id)
      }

      this.formService.post('Blog/AddBlog',blogObj).subscribe(res => {
        if(res){
          this.formGroup.reset()
          this.router.navigate(['/content/blogs'])
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
      let blogObj ={
        id:this.blogId,
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
        showOrder: 0,
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
        gallery: galleryList,
        tags: this.selectedTag.map(t => t.id)
      }

      this.formService.post('Blog/UpdateBlog',blogObj).subscribe(res => {
        if(res){
          this.formGroup.reset()
          this.router.navigate(['/content/blogs'])
        }
      })
    }
  }

  deleteGallery(id){
    this.formService.post('Blog/DeleteBlogGallery/' + id, {}).subscribe(res => res)
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
      this.blogId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getBlogDetails(this.blogId)
    }
    this.getTags()
  }

}
