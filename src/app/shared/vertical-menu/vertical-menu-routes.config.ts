import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: '/content/landing', title: 'Landing', icon: 'ft-map', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Home', icon: 'ft-home', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', hasPermission:true, isExternalLink: false,
     submenu: [
      { path: '/content/contactUs', title: 'Contact Us', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: [] },
      { path: '/content/social', title: 'Social Media', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: [] },
      { path: '/content/video', title: 'Video', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: [] },
      { path: '/content/about', title: 'About Us', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: [] },
      { path: '/content/footerLinks', title: 'Footer Links', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: [] },
      { path: '/content/navbarIcon', title: 'Navbar', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: [] },
      { path: '/content/logo', title: 'Logo', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: [] },
      { path: '/content/contactUsForm', title: 'Contact Us Form', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', hasPermission:false, isExternalLink: false, submenu: [] },
     ]
  },
  {
    path: '/content/slider', title: 'Slider', icon: 'ft-camera', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: []
  },
  {
    path: '/content/blogs', title: 'Blogs', icon: 'ft-book', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: []
  },
  {
    path: '/content/developers', title: 'Developers', icon: 'ft-command', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: []
  },
  {
    path: '/content/projects', title: 'Projects', icon: 'ft-server', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: []
  },
  {
    path: '/content/cites', title: 'Cites', icon: 'ft-globe', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: []
  },
  {
    path: '/content/tags', title: 'Tags', icon: 'ft-tag', class: '', badge: '', badgeClass: '', hasPermission:true, isExternalLink: false, submenu: []
  },
  {
    path: '/content/userManagment', title: 'User Managment', icon: 'ft-user', class: '', badge: '', badgeClass: '', hasPermission:false, isExternalLink: false, submenu: []
  }

//   {
//     path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'has-sub', badge: '3', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
//     submenu: [
//         { path: '/YOUR-ROUTE-PATH', title: 'Second Level', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//         {
//             path: '', title: 'Second Level Child', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
//             submenu: [
//                 { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.1', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//                 { path: '/YOUR-ROUTE-PATH', title: 'Third Level 1.2', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//             ]
//         },
//     ]
// },
];
