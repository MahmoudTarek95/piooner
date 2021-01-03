import { Component, OnInit } from '@angular/core';
import { FormService } from 'app/shared/services/form.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogsList
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
    this.getBlogsList()
  }
  deleteBlog(id){
    this.formService.post('Blog/DeleteBlog/' + id, {}).subscribe(res => {
      this.getBlogsList()
    })
  }

  getBlogsList(){
    this.formService.get('Blog/BlogAdminList').subscribe((res:any) => {
      this.blogsList = res.data
      console.log(this.blogsList)
    })
  }
}
