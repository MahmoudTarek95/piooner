import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable'
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable-shared.component.html',
  styleUrls: ['./datatable-shared.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DatatableSharedComponent implements OnInit {
  @Input() type
  @Input() rows = []
  @Input() columns =[]
  @Input() addButtonRouterLink
  @Input() filterBy = []
  @Input() hasImage = false
  @Input() loadingIndicator = true
  @Output() delete:EventEmitter<any> = new EventEmitter();
  @Output() filterCity:EventEmitter<any> = new EventEmitter();
  @Output() commercialCity:EventEmitter<any> = new EventEmitter();
  @Output() specialCity:EventEmitter<any> = new EventEmitter();
  @Output() userId:EventEmitter<any> = new EventEmitter();
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('status', { static: true }) photo: TemplateRef<any>; // select photo element
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>; // select actions element


  ColumnMode = ColumnMode;

  constructor(private router:Router,private formService:FormService, private toasterService:NGXToastrService) {}
  ngOnInit(){
  }

  editRow(id){
    switch(this.type){
      case 'slider' :
        this.router.navigate(['content/slider/edit/' + id])
        break;
      case 'blog' :
        this.router.navigate(['content/blogs/edit/' + id])
        break;
      case 'developer' :
        this.router.navigate(['content/developers/edit/' + id])
        break;
      case 'project' :
        this.router.navigate(['content/projects/edit/' + id])
        break;
      case 'cites' :
        this.router.navigate(['content/cites/edit/' + id])
        break;
      case 'social' :
        this.router.navigate(['content/social/edit/' + id])
        break;
      case 'about' :
        this.router.navigate(['content/about/edit/' + id])
        break;
      case 'footer' :
        this.router.navigate(['content/footerLinks/edit/' + id])
        break;
    }
  }
  rowStatus(id){
    switch(this.type){
      case 'blog':
        this.formService.post(`Blog/ChangeStatuesBlog/${id}`, {}).subscribe((res:any) => {
          this.toasterService.TypeSuccess()
        },(error) => {
          this.toasterService.TypeError()
        })
        break;
      case 'developer':
        this.formService.post(`Developer/ChangeStatuesDeveloper/${id}`, {}).subscribe((res:any) => {
          this.toasterService.TypeSuccess()
        },(error) => {
          this.toasterService.TypeError()
        })
        break;
      case 'project':
        this.formService.post(`Project/ChangeStatuesProject/${id}`, {}).subscribe((res:any) => {
          this.toasterService.TypeSuccess()
        },(error) => {
          this.toasterService.TypeError()
        })
        break;
      case 'cites':
        this.formService.post(`City/IsActiveCity/${id}`, {}).subscribe((res:any) => {
          this.toasterService.TypeSuccess()
        },(error) => {
          this.toasterService.TypeError()
        })
        break;
      case 'social':
        this.formService.post(`Home/ActiveSocialMedia/${id}`, {}).subscribe((res:any) => {
          this.toasterService.TypeSuccess()
        },(error) => {
          this.toasterService.TypeError()
        })
        break;
    }
  }
  change(id){
    this.router.navigate(['content/userManagment/changePass/' + id])
  }
  parseId(id){
    return parseInt(id)
  }
  citySpecial(id){
    this.specialCity.emit(id)
  }
  cityFilter(id,isCommercial){
    this.filterCity.emit({id:id,isCommercial:isCommercial})
  }
  cityCommercial(id,event){
    this.commercialCity.emit({
      id:id,
      event:event
    })
  }
  userLocked(id){
    this.userId.emit(id)
  }
  deleteRow(id){
    this.delete.emit(id)
  }


}
