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
import { CitesComponent } from './cites/cites.component';
import { AddEditCitesComponent } from './cites/add-edit-cites/add-edit-cites.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { EditSocialMediaComponent } from './social-media/edit-social-media/edit-social-media.component';
import { VideoComponent } from './video/video.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EditAboutUsComponent } from './about-us/edit-about-us/edit-about-us.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';
import { AddEditFooterLinksComponent } from './footer-links/add-edit-footer-links/add-edit-footer-links.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { RegisterComponent } from './user-managment/register/register.component';
import { AddUserRoleComponent } from './user-managment/add-user-role/add-user-role.component';
import { HomeNavbarIconComponent } from './home-navbar-icon/home-navbar-icon.component';
import { SiteLogoComponent } from './site-logo/site-logo.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { TagsComponent } from './tags/tags.component';
import { AddEditTagComponent } from './tags/add-edit-tag/add-edit-tag.component';
import { ViewContactUsFormComponent } from './contact-us-form/view-contact-us-form/view-contact-us-form.component';
import { ChangePasswordComponent } from './user-managment/change-password/change-password.component';
import { AboutUsBannerComponent } from './about-us/about-us-banner/about-us-banner.component';



@NgModule({
  declarations: [SliderComponent, AddEditSliderComponent, BlogsComponent, AddEditBlogComponent, DeveloperComponent, AddEditDeveloperComponent, ProjectComponent, AddEditProjectComponent, HomeComponent, CitesComponent, AddEditCitesComponent, ContactUsComponent, SocialMediaComponent, EditSocialMediaComponent, VideoComponent, AboutUsComponent, EditAboutUsComponent, FooterLinksComponent, AddEditFooterLinksComponent, UserManagmentComponent, RegisterComponent, AddUserRoleComponent, HomeNavbarIconComponent, SiteLogoComponent, ContactUsFormComponent, TagsComponent, AddEditTagComponent, ViewContactUsFormComponent, ChangePasswordComponent, AboutUsBannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FullPagesRoutingModule
  ]
})
export class FullPagesModule { }
