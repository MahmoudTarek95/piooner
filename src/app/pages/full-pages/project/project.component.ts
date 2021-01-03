import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectsList
  columns

  constructor(private formService:FormService) {
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
    this.formService.post('Project/DeleteProject/' + id, {}).subscribe(res => {
      this.getProjectsList()
    })
  }

  getProjectsList(){
    this.formService.get('Project/ProjectAdminList').subscribe((res:any) => {
      this.projectsList = res.data
      console.log(this.projectsList)
    })
  }

}
