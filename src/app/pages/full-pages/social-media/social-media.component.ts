import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {
  loadingIndicator
  socialList
  columns

  constructor(private formService:FormService) {
    this.columns = [
      {
        name:'Name',
        prop:'name',
        width:150
      },
      {
        name:'Link',
        prop:'link',
        width:150
      },
    ]
  }

  ngOnInit(): void {
    this.getSocialList()
  }


  getSocialList(){
    this.formService.get('Home/GetAdminSocailMedia').subscribe((res:any) => {
      this.socialList = res.data
    })
  }

}
