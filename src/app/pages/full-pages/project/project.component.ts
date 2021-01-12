import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {
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

  constructor(private formService:FormService,private toasterService:NGXToastrService,private router:Router,private cd:ChangeDetectorRef) {
    this.columns = [
      {
        name:'Name',
        prop:'nameEn',
        width:150
      }
    ]
  }

  ngOnInit(): void {
    this.getProjectsList()
  }
  deleteProject(id){
    this.formService.post('Project/DeleteProject/', [id]).subscribe(res => {
      this.getProjectsList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }
  deleteSelectedValues(){
    this.formService.post('Project/DeleteProject',this.selectedIds).subscribe(res => {
      this.selectedIds = []
      this.chkBoxSelected = []
      this.getProjectsList()
      this.toasterService.TypeSuccess()
    },error => {
      this.toasterService.TypeError()
    })
  }

  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
    this.selectedIds = this.chkBoxSelected.map(res => {
      return  res.id
    })
  }
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.nameEn.toLowerCase().indexOf(val) !== -1  || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  editRow(id){
    this.router.navigate(['content/projects/edit/' + id])
  }
  rowStatus(id){
    this.formService.post(`Project/ChangeStatuesProject/${id}`, {}).subscribe((res:any) => {
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }

  getProjectsList(){
    this.formService.get('Project/ProjectAdminList').subscribe((res:any) => {
      this.rows = res.data
      this.cd.markForCheck()
      this.tempData = [...this.rows]
    })
  }

}
