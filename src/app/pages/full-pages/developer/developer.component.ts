import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {
  developersList
  columns

  constructor(private formService:FormService,private toasterService:NGXToastrService,private cd:ChangeDetectorRef) {
    this.columns = [
      {
        name:'Name',
        prop:'nameEn',
        width:150
      }
    ]
  }

  ngOnInit(): void {
    this.getDevelopersList()
  }
  deleteDeveloper(id){
    this.formService.post('Developer/DeleteDeveloper/' + id, {}).subscribe(res => {
      this.getDevelopersList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

  getDevelopersList(){
    this.formService.get('Developer/ListDevelopers').subscribe((res:any) => {
      this.developersList = res.data
      this.cd.markForCheck()
    })
  }

}
