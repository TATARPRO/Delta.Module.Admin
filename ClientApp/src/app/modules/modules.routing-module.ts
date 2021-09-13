import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./cms/cms.module').then(x => x.CMSModule) },
  { path: 'cms', loadChildren: () => import('./cms/cms.module').then(x => x.CMSModule) },
  { path: 'projectv', loadChildren: () => import('./projectV/projectv.module').then(x => x.ProjectVModule) },
  { path: 'file-manager', loadChildren: () => import('./file-manager/file-manager.module').then(x => x.FileManagerModule) }
 ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class ModulesRoutingModule { }

export const ModulesRoutingComponent = []
