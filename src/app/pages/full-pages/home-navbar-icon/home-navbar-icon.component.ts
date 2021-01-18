import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-home-navbar-icon',
  templateUrl: './home-navbar-icon.component.html',
  styleUrls: ['./home-navbar-icon.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomeNavbarIconComponent implements OnInit {
  rows = []
  columns = [
    {
      name:'Id',
      prop:'id',
      width:150
    },
    {
      name:'Name',
      prop:'nameEn',
      width:150
    }
  ]
  navbarList

  constructor(private formSerive:FormService, private toastrSerivce:NGXToastrService,private cd:ChangeDetectorRef) {
    this.getNavbarList()
   }

  ngOnInit(): void {
  }
  getNavbarList(){
    this.formSerive.get('Home/AdminNavbar').subscribe((res:any) => {
      this.rows = res.data
      this.cd.markForCheck()
    })
  }

  rowStatus(id){
    this.formSerive.post('Home/ActiveNavbar/' + id, {}).subscribe(res => {
      this.toastrSerivce.TypeSuccess()
    },error => {
      if(error.status == 400){
        this.toastrSerivce.TypeWarning(error.error.error.message)
        this.cd.markForCheck()
      }else{
        this.toastrSerivce.TypeError()
      }
    })
  }

}
