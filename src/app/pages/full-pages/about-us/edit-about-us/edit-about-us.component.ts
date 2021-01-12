import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-edit-about-us',
  templateUrl: './edit-about-us.component.html',
  styleUrls: ['./edit-about-us.component.scss']
})
export class EditAboutUsComponent implements OnInit {

  aboutForm:FormGroup;
  aboutId
  aboutDetails
  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {
    this.aboutForm = fb.group({
      titleEN:['',[Validators.required]],
      titleAr:['',[Validators.required]],
      descriptionEn:['',[Validators.required]],
      descriptionAr:['',[Validators.required]],
    })
  }

  getAboutDetails(id){
    this.formService.get('Home/GetAboutUs/' + id).subscribe((res:any) => {
      this.aboutDetails = res.data
      this.cd.markForCheck()
      this.setAboutData(this.aboutDetails)
    })
  }

  setAboutData(aboutData){
    this.aboutForm.patchValue({
      titleEN:aboutData.titleEN,
      titleAr:aboutData.titleAr,
      descriptionEn:aboutData.descriptionEn,
      descriptionAr:aboutData.descriptionAr
    })
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.aboutId = this.activatedRoute.snapshot.paramMap.get('id')
      this.getAboutDetails(this.aboutId)
    }
  }

  submitForm(){
    let aboutUsObj = {
      id:this.aboutId,
      titleEN:this.aboutForm.controls['titleEN'].value,
      titleAr:this.aboutForm.controls['titleAr'].value,
      descriptionEn:this.aboutForm.controls['descriptionEn'].value,
      descriptionAr:this.aboutForm.controls['descriptionAr'].value
    }

    this.formService.post('Home/EditAboutUs',aboutUsObj).subscribe(res => {
      this.router.navigate(['/content/about'])
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }
  cancel(){
    this.router.navigate(['/content/about'])
  }


}
