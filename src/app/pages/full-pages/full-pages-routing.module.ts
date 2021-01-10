import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoleGuard } from 'app/shared/auth/auth-role.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { EditAboutUsComponent } from './about-us/edit-about-us/edit-about-us.component';
import { AddEditBlogComponent } from './blogs/add-edit-blog/add-edit-blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddEditCitesComponent } from './cites/add-edit-cites/add-edit-cites.component';
import { CitesComponent } from './cites/cites.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AddEditDeveloperComponent } from './developer/add-edit-developer/add-edit-developer.component';
import { DeveloperComponent } from './developer/developer.component';
import { AddEditFooterLinksComponent } from './footer-links/add-edit-footer-links/add-edit-footer-links.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';
import { HomeNavbarIconComponent } from './home-navbar-icon/home-navbar-icon.component';
import { HomeComponent } from './home/home.component';
import { AddEditProjectComponent } from './project/add-edit-project/add-edit-project.component';
import { ProjectComponent } from './project/project.component';
import { SiteLogoComponent } from './site-logo/site-logo.component';
import { AddEditSliderComponent } from './slider/add-edit-slider/add-edit-slider.component';
import { SliderComponent } from './slider/slider.component';
import { EditSocialMediaComponent } from './social-media/edit-social-media/edit-social-media.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { AddEditTagComponent } from './tags/add-edit-tag/add-edit-tag.component';
import { TagsComponent } from './tags/tags.component';
import { AddUserRoleComponent } from './user-managment/add-user-role/add-user-role.component';
import { RegisterComponent } from './user-managment/register/register.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { VideoComponent } from './video/video.component';


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
        path:'landing',
        component:HomeComponent
      },
      {
        path:'navbarIcon',
        component:HomeNavbarIconComponent
      },
      {
        path:'contactUsForm',
        component:ContactUsFormComponent
      },
      {
        path:'logo',
        component:SiteLogoComponent
      },
      {
        path:'cites',
        component:CitesComponent
      },
      {
        path:'cites/add',
        component:AddEditCitesComponent,
        data:{
          isAdd:true
        }
      },
      {
        path:'cites/edit/:id',
        component:AddEditCitesComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'contactUs',
        component:ContactUsComponent
      },
      {
        path:'video',
        component:VideoComponent
      },
      {
        path:'social',
        component:SocialMediaComponent
      },
      {
        path:'social/edit/:id',
        component:EditSocialMediaComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'about',
        component:AboutUsComponent
      },
      {
        path:'about/edit/:id',
        component:EditAboutUsComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'footerLinks',
        component:FooterLinksComponent
      },
      {
        path:'footerLinks/add',
        component:AddEditFooterLinksComponent,
        data:{
          isAdd:true
        }
      },
      {
        path:'footerLinks/edit/:id',
        component:AddEditFooterLinksComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
      {
        path:'userManagment',
        component:UserManagmentComponent,
        canActivate:[AuthRoleGuard]
      },
      {
        path:'userManagment/register',
        component:RegisterComponent,
        canActivate:[AuthRoleGuard],
        data:{
          isAdd:true
        }
      },
      {
        path:'userManagment/addUserRole',
        component:AddUserRoleComponent,
        canActivate:[AuthRoleGuard],
        data:{
          isAdd:true
        }
      },
      {
        path:'tags',
        component:TagsComponent
      },
      {
        path:'tags/add',
        component:AddEditTagComponent,
        data:{
          isAdd:true
        }
      },
      {
        path:'tags/edit/:id',
        component:AddEditTagComponent,
        data:{
          isAdd:false,
          isEdit:true
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
