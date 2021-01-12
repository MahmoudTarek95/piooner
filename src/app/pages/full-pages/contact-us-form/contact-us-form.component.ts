import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { saveAs } from 'file-saver';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType
} from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ContactUsFormComponent implements OnInit {

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

  constructor(private formService:FormService, private toasterService:NGXToastrService, private datePipe:DatePipe,private router:Router,private cd:ChangeDetectorRef) {

    this.columns = [
      {
        name:'Name',
        prop:'name',
        width:100
      },
      {
        name:'Email',
        prop:'email',
        width:100
      },
      {
        name:'Phone',
        prop:'phone',
        width:100
      }
    ]
  }

  ngOnInit(): void {
    this.getContactUsFormList()
  }

  getContactUsFormList(){
    this.subscription = this.formService.get('Home/ListContactUsForm').subscribe((res:any) => {
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
  downloadExcelFile(){
    this.formService.get('Home/DownLoadExcelSheet','blob').subscribe(res => {
      this.downloadFile(res)
    })
  }
  downloadFile(file){
    let date = new Date()


    let blob = new Blob([file], { type: 'text/xlsx'});
    saveAs(blob, 'Client-' + this.datePipe.transform(date,"dd-MM-yyyy").toString()  +'.xlsx')
  }
  deleteSelectedValues(){
    this.formService.post('Home/DeleteContactUs',this.selectedIds).subscribe(res => {
      this.selectedIds = []
      this.chkBoxSelected = []
      this.getContactUsFormList()
      this.toasterService.TypeSuccess()
    },error => {
      this.toasterService.TypeError()
    })
  }
  deleteRow(id){
    this.formService.post('Home/DeleteContactUs/', [id]).subscribe(res => {
      this.getContactUsFormList()
      this.toasterService.TypeSuccess()
    },error => {
      this.toasterService.TypeError()
    })
  }
  viewItem(id){
    this.router.navigate(['content/contactUsForm/view/' + id])
  }
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || d.email.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
