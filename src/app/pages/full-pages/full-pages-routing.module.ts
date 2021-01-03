import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditBlogComponent } from './blogs/add-edit-blog/add-edit-blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddEditDeveloperComponent } from './developer/add-edit-developer/add-edit-developer.component';
import { DeveloperComponent } from './developer/developer.component';
import { HomeComponent } from './home/home.component';
import { AddEditProjectComponent } from './project/add-edit-project/add-edit-project.component';
import { ProjectComponent } from './project/project.component';
import { AddEditSliderComponent } from './slider/add-edit-slider/add-edit-slider.component';
import { SliderComponent } from './slider/slider.component';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'slider',
        component:SliderComponent
      },
      {
        path:'slider/add',
        component:AddEditSliderComponent,
        data:{
          isAdd:true
        }
      },
      {
        path:'slider/edit/:id',
        component:AddEditSliderComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'blogs',
        component:BlogsComponent
      },
      {
        path:'blogs/add',
        component:AddEditBlogComponent,
        data:{
          isAdd:true
        }
      },
      {
        path:'blogs/edit/:id',
        component:AddEditBlogComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'developers',
        component:DeveloperComponent
      },
      {
        path:'developers/add',
        component:AddEditDeveloperComponent,
        data:{
          isAdd:true
        }
      },
      {
        path:'developers/edit/:id',
        component:AddEditDeveloperComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'projects',
        component:ProjectComponent
      },
      {
        path:'projects/add',
        component:AddEditProjectComponent,
        data:{
          isAdd:true
        }
      },
      {
        path:'projects/edit/:id',
        component:AddEditProjectComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'home',
        component:HomeComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
