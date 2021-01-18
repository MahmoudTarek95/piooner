import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-edit-social-media',
  templateUrl: './edit-social-media.component.html',
  styleUrls: ['./edit-social-media.component.scss']
})
export class EditSocialMediaComponent implements OnInit {
  socialForm:FormGroup;
  socialId
  socialDetails
  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {
    this.socialForm = fb.group({
      link:['',[Validators.required]],
      name:['',[Validators.required]]
    })
  }

  getSocialDetails(id){
    this.formService.get('Home/GetSocialMedia/' + id).subscribe((res:any) => {
      this.socialDetails = res.data
      this.cd.markForCheck()
      this.setSocialData(this.socialDetails)
    })
  }

  setSocialData(socialData){
    this.socialForm.patchValue({
      link:socialData.link,
      name:socialData.name
    })
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.socialId = this.activatedRoute.snapshot.paramMap.get('id')
      this.getSocialDetails(this.socialId)
    }
  }

  submitForm(){
    let socialMediaObj = {
      id:this.socialId,
      name:this.socialForm.controls['name'].value,
      link:this.socialForm.controls['link'].value
    }

    this.formService.post('Home/EditSocailMedia',socialMediaObj).subscribe(res => {
      this.router.navigate(['/content/social'])
      this.toasterService.TypeSuccess()
    },(error) => {
      if(error.status == 400){
        this.toasterService.TypeWarning(error.error.error.message)
        this.cd.markForCheck()
      }else{
        this.toasterService.TypeError()
      }
    })
  }
  cancel(){
    this.router.navigate(['/content/social'])
  }

}
