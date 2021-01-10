import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormService } from 'app/shared/services/form.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class BlogsComponent implements OnInit {
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
  constructor(private formService:FormService, private toasterService:NGXToastrService,private router:Router) {
    this.columns = [
      {
        name:'Name',
        prop:'nameEn',
        width:150
      }
    ]
  }

  ngOnInit(): void {
    this.getBlogsList()
  }
  deleteBlog(id){
    this.formService.post('Blog/DeleteBlog/', [id]).subscribe(res => {
      this.getBlogsList()
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }
  deleteSelectedValues(){
    this.formService.post('Blog/DeleteBlog',this.selectedIds).subscribe(res => {
      this.selectedIds = []
      this.chkBoxSelected = []
      this.getBlogsList()
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
    this.router.navigate(['content/blogs/edit/' + id])
  }
  rowStatus(id){
    this.formService.post(`Blog/ChangeStatuesBlog/${id}`, {}).subscribe((res:any) => {
      this.toasterService.TypeSuccess()
    },(error) => {
      this.toasterService.TypeError()
    })
  }


  getBlogsList(){
    this.formService.get('Blog/BlogAdminList').subscribe((res:any) => {
      this.rows = res.data
      this.tempData = [...this.rows]
    })
  }
}
