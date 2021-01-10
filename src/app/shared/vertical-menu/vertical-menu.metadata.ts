// Sidebar route metadata
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge?: string;
    badgeClass?: string;
    hasPermission?:boolean
    isExternalLink: boolean;
    submenu : RouteInfo[];
}
