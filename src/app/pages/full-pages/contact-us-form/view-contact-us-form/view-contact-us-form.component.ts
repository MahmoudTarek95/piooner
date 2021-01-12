import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-view-contact-us-form',
  templateUrl: './view-contact-us-form.component.html',
  styleUrls: ['./view-contact-us-form.component.scss']
})
export class ViewContactUsFormComponent implements OnInit {
  contactId
  contactData
  constructor(private activatedRoute:ActivatedRoute,private formService:FormService, private router:Router) { }

  ngOnInit(): void {
    this.contactId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getContactData(this.contactId)
  }
  getContactData(id){
    this.formService.get('Home/ViewContactUs/' + id).subscribe((res:any) => {
      this.contactData = res.data
    })
  }

  back(){
    this.router.navigate(['content/contactUsForm'])
  }


}
