import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { FullPagesRoutingModule } from './full-pages-routing.module';
import { AddEditSliderComponent } from './slider/add-edit-slider/add-edit-slider.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogsComponent } from './blogs/blogs.component';
import { AddEditBlogComponent } from './blogs/add-edit-blog/add-edit-blog.component';
import { DeveloperComponent } from './developer/developer.component';
import { AddEditDeveloperComponent } from './developer/add-edit-developer/add-edit-developer.component';
import { ProjectComponent } from './project/project.component';
import { AddEditProjectComponent } from './project/add-edit-project/add-edit-project.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [SliderComponent, AddEditSliderComponent, BlogsComponent, AddEditBlogComponent, DeveloperComponent, AddEditDeveloperComponent, ProjectComponent, AddEditProjectComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FullPagesRoutingModule
  ]
})
export class FullPagesModule { }
