import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home-directory/home-dir.module').then(x => x.HomeDirectoryModule) },
  { path: 'file-manager', loadChildren: () => import('./home-directory/home-dir.module').then(x => x.HomeDirectoryModule) }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class FileManagerRoutingModule { }

export const FileManagerRoutingComponent = []
