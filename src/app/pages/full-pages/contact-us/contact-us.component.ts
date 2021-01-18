import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm:FormGroup
  contactData = {}
  constructor(private fb:FormBuilder,private formService:FormService,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {
    this.contactForm = fb.group({
      mobileNumber: ['',[Validators.required]],
      hotline:['',[Validators.required]],
      locationEn: ['',[Validators.required]],
      locationAr:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]]
    })
  }

  setContactData(contactData){
    this.contactForm.patchValue({
      mobileNumber: contactData.mobileNumber,
      hotline:contactData.hotline,
      locationEn: contactData.locationEn,
      locationAr:contactData.locationAr,
      email:contactData.email
    })
  }

  getContactData(){
    this.formService.get('Home/GetAdminHomeContact').subscribe((res:any) => {
      if(res){
        this.contactData = res.data
        this.cd.markForCheck()
        this.setContactData(this.contactData)
      }
    })
  }
  ngOnInit(): void {
    this.getContactData()
  }

  submitForm(){
    let contactObj = {
      mobileNumber:this.contactForm.controls['mobileNumber'].value,
      hotline:this.contactForm.controls['hotline'].value,
      locationEn:this.contactForm.controls['locationEn'].value,
      locationAr:this.contactForm.controls['locationAr'].value,
      email:this.contactForm.controls['email'].value,
    }

    this.formService.post('Home/EditHomeContact',contactObj).subscribe(res => {
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

}
