import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Route, PreloadAllModules } from '@angular/router';

class extension {
  public static getRoutes(): Route[] {
    return []
  }

  public static getComponents(): Component[] {
    return [];
  }
}

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/webpage.module').then(x => x.WebPageModule) },
  { path: 'carousel-widget', loadChildren: () => import('./carousel-widget/carousel-widget.module').then(x => x.CarouselWidgetModule) },
  { path: 'flex-widget', loadChildren: () => import('./flex-widget/flex-widget.module').then(x => x.FlexWidgetModule) },
  { path: 'menus', loadChildren: () => import('./menu/menu.module').then(x => x.MenuModule) },
  { path: 'webpages', loadChildren: () => import('./pages/webpage.module').then(x => x.WebPageModule) },
  { path: 'container102', loadChildren: () => import('./container102/container102.module').then(x => x.Container102Module) },
  { path: 'container210', loadChildren: () => import('./container210/container210.module').then(x => x.Container210Module) },
  { path: 'container363', loadChildren: () => import('./container363/container363.module').then(x => x.Container363Module) },
  { path: 'container39', loadChildren: () => import('./container39/container39.module').then(x => x.Container39Module) },
  { path: 'container48', loadChildren: () => import('./container48/container48.module').then(x => x.Container48Module) },
  { path: 'container84', loadChildren: () => import('./container84/container84.module').then(x => x.Container84Module) },
  { path: 'container93', loadChildren: () => import('./container93/container93.module').then(x => x.Container93Module) },
  { path: 'container12', loadChildren: () => import('./container12/container12.module').then(x => x.Container12Module) },
  { path: 'container2', loadChildren: () => import('./container2/container2.module').then(x => x.Container2Module) },
  { path: 'container3', loadChildren: () => import('./container3/container3.module').then(x => x.Container3Module) },
  { path: 'container4', loadChildren: () => import('./container4/container4.module').then(x => x.Container4Module) },
  { path: 'container6', loadChildren: () => import('./container6/container6.module').then(x => x.Container6Module) },
 ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [],
  providers: []
})
export class CMSRoutingModule { }

export const CMSroutingComponent = [
 
]
