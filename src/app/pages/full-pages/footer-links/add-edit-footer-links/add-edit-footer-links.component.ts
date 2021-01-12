import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-add-edit-footer-links',
  templateUrl: './add-edit-footer-links.component.html',
  styleUrls: ['./add-edit-footer-links.component.scss']
})
export class AddEditFooterLinksComponent implements OnInit {

  isEditingMode = false;
  footerLinkId
  sliderDetails = {}

  formGroup

  constructor(private fb:FormBuilder, private formService:FormService,private router:Router, private activatedRoute:ActivatedRoute,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {

    this.formGroup = fb.group({
      tiltleEn: ['',[Validators.required]],
      tiltleAr:['',[Validators.required]],
      url: ['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.isEdit){
      this.footerLinkId = this.activatedRoute.snapshot.paramMap.get('id')
      this.isEditingMode = true
      this.getFooterDetails(this.footerLinkId)
    }
  }

  setFooterData(footerData){
    this.formGroup.patchValue({
      tiltleEn: footerData.tiltleEn,
      tiltleAr:footerData.tiltleAr,
      url: footerData.url,
    })
  }

  getFooterDetails(id){
    this.formService.get('Home/GetImportantLink/' +id).subscribe((res:any) => {
      if(res){
        this.sliderDetails = res.data
        this.cd.markForCheck()
        this.setFooterData(this.sliderDetails)
      }
    })
  }

  submitForm(){
    if(!this.isEditingMode){
      let sliderData = {
        tiltleEn: this.formGroup.controls['tiltleEn'].value,
        tiltleAr: this.formGroup.controls['tiltleAr'].value,
        url: this.formGroup.controls['url'].value,
      }

      this.formService.post('Home/AddImportantLink',sliderData).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/footerLinks'])
        this.toasterService.TypeSuccess()
      },(error) => {
        this.toasterService.TypeError()
      })
    }else {
      let sliderData = {
        id:this.footerLinkId,
        tiltleEn: this.formGroup.controls['tiltleEn'].value,
        tiltleAr: this.formGroup.controls['tiltleAr'].value,
        url: this.formGroup.controls['url'].value,
      }

      this.formService.post('Home/EditFooterLinks',sliderData).subscribe(res => {
        this.formGroup.reset()
        this.router.navigate(['content/footerLinks'])
        this.toasterService.TypeSuccess()
      },(error) => {
        this.toasterService.TypeError()
      })
    }
  }
  cancel(){
    this.router.navigate(['/content/slider'])
  }

}
