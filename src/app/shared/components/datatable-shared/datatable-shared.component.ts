import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable'
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable-shared.component.html',
  styleUrls: ['./datatable-shared.component.scss']

})
export class DatatableSharedComponent implements OnInit {
  temp = [];

  @Input() type
  @Input() rows =[]
  @Input() columns =[]
  @Input() addButtonRouterLink
  @Input() filterBy = []
  @Input() hasImage = false
  @Input() loadingIndicator = true
  @Output() delete:EventEmitter<any> = new EventEmitter();
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('status', { static: true }) photo: TemplateRef<any>; // select photo element
  @ViewChild('actions', { static: true }) actions: TemplateRef<any>; // select actions element


  ColumnMode = ColumnMode;

  constructor(private router:Router,private formService:FormService) {
    console.log(this.photo)
    let data = this.rows

    this.temp = [...data];

    // push our inital complete list
    this.rows = data;
  }
  ngOnInit(){

    console.log( this.columns)
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(d => {
      if(this.filterBy && this.filterBy.length > 0){
        this.filterBy.map(f => {
          return d[f].toLowerCase().indexOf(val) !== -1 || d[f].toLowerCase().indexOf(val) !== -1 || !val;
        })
      }

    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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
    }
  }
  rowStatus(id){
    switch(this.type){
      case 'blog':
        this.formService.post(`Blog/ChangeStatuesBlog/${id}`, {}).subscribe((res:any) => res.data)
        break;
      case 'developer':
        this.formService.post(`Developer/ChangeStatuesDeveloper/${id}`, {}).subscribe((res:any) => res.data)
        break;
      case 'project':
        this.formService.post(`Project/ChangeStatuesProject/${id}`, {}).subscribe((res:any) => res.data)
        break;
    }
  }
  deleteRow(id){
    this.delete.emit(id)
  }


}
