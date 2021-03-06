import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { FormService } from 'app/shared/services/form.service';
import { ModalService } from 'app/shared/services/modal.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TagsComponent implements OnInit {


  loadingIndicator
  public rows = []
  columns
  public ColumnMode = ColumnMode;
  subscription:Subscription
  selectedIds = []
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  private tempData = [];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private formService:FormService, private toasterService:NGXToastrService,private router:Router,private cd:ChangeDetectorRef, private modalSerivce:ModalService) {

    this.columns = [
      {
        name:'Name',
        prop:'nameEn',
        width:100
      }
    ]
  }

  ngOnInit(): void {
    this.getTagsList()
  }

  getTagsList(){
    this.subscription = this.formService.get('Tag/ListTag').subscribe((res:any) => {
      this.rows = res.data
      this.cd.markForCheck()
      this.tempData = [...this.rows]
    })
  }
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
    this.selectedIds = this.chkBoxSelected.map(res => {
      return  res.id
    })
  }
  deleteSelectedValues(){
    this.formService.post('Tag/DeleteTag',this.selectedIds).subscribe(res => {
      this.selectedIds = []
      this.chkBoxSelected = []
      this.getTagsList()
      this.toasterService.TypeSuccess()
    },error => {
      this.toasterService.TypeError()
    })
  }
  deleteRow(id){
    this.formService.post('Tag/DeleteTag', [id]).subscribe(res => {
      this.getTagsList()
      this.toasterService.TypeSuccess()
    },error => {
      this.toasterService.TypeError()
    })
  }
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.nameEn.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  editRow(id){
    this.router.navigate(['content/tags/edit/' + id])
  }

  openModal(id){
    const buttons = [
      {
        id:1,
        name:'Delete',
        class:'btn-danger'
      },
      {
        id:2,
        name:'Cancel',
        class:'btn-primary'
      }
    ]
    this.modalSerivce.open(buttons)
    this.modalSerivce.btnId.pipe(first()).subscribe(btnId => {
      if(btnId == 1){
        this.deleteRow(id)
      }else{
        this.modalSerivce.dismissModal()
      }
    })
  }
  openModalMulti(){
    const buttons = [
      {
        id:1,
        name:'Delete',
        class:'btn-danger'
      },
      {
        id:2,
        name:'Cancel',
        class:'btn-primary'
      }
    ]
    this.modalSerivce.open(buttons)
    this.modalSerivce.btnId.pipe(first()).subscribe(btnId => {
      if(btnId == 1){
        this.deleteSelectedValues()
      }else{
        this.modalSerivce.dismissModal()
      }
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
