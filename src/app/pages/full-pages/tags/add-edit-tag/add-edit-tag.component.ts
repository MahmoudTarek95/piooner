import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-add-edit-tag',
  templateUrl: './add-edit-tag.component.html',
  styleUrls: ['./add-edit-tag.component.scss']
})
export class AddEditTagComponent implements OnInit {

  isEditingMode = false;
  tagId
  tagDetails = {}

  active = 1; // Basic Navs

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;

  formGroup

  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {

    this.formGroup = fb.group({
      nameEn: ['',[Validators.required]],
      nameAr:['',[Validators.required]],
    })
   }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.tagId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getTagDetails(this.tagId)
    }
  }

  setTagData(tagData){
    this.formGroup.patchValue({
      nameEn: tagData.nameEn,
      nameAr:tagData.nameAr,
    })
  }

  getTagDetails(id){
    this.formService.get('Tag/GetTag/' +id).subscribe((res:any) => {
      if(res){
        this.tagDetails = res.data
        this.cd.markForCheck()
        this.setTagData(this.tagDetails)
      }
    })
  }

  submitForm(){
    if(!this.isEditingMode){
      let tagsObj = {
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
      }

      this.formService.post('Tag/AddTag',tagsObj).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/tags'])
        this.toasterService.TypeSuccess()
      },(error) => {
        this.toasterService.TypeError()
      })
    }else {
      let tagsObj = {
        id:this.tagId,
        nameEn: this.formGroup.controls['nameEn'].value,
        nameAr: this.formGroup.controls['nameAr'].value,
      }

      this.formService.post('Tag/EditTag',tagsObj).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/tags'])
        this.toasterService.TypeSuccess()
      },(error) => {
        this.toasterService.TypeError()
      })
    }
  }
  cancel(){
    this.router.navigate(['/content/tags'])
  }

}
