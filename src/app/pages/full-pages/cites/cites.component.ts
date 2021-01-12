import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-cites',
  templateUrl: './cites.component.html',
  styleUrls: ['./cites.component.scss']
})
export class CitesComponent implements OnInit {

  loadingIndicator
  citesList
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
    this.getCitesList()
  }
  citySpecial(id){
    this.formService.post(`City/IsSpecialCity/${id}`, {}).subscribe((res:any) => {
      this.getCitesList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }
  cityFilter(event){
    this.formService.post(`City/IsFilterHome/${event.id}?isCommercial=${event.isCommercial}`, {}).subscribe((res:any) => {
      this.getCitesList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }
  cityCommercial(data){
    this.formService.post(`City/IsCommercialCity/${data.id}?IsCommercial=${data.event.target.checked}`, {}).subscribe((res:any) => {
      this.getCitesList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

  deleteRow(id){
    this.formService.post('City/DeleteCity/' + id, {}).subscribe(res => {
      this.getCitesList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

  getCitesList(){
    this.formService.get('City/Listcity').subscribe((res:any) => {
      this.citesList = res.data
      this.cd.markForCheck()
    })
  }
}
