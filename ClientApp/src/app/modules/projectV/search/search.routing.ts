import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./search-desktop/search-widget.module').then(x => x.SearchWidgetModule) },
  { path: 'search-desktop', loadChildren: () => import('./search-desktop/search-widget.module').then(x => x.SearchWidgetModule) },
  { path: 'search-mobile', loadChildren: () => import('./search-mobile/search-widget.module').then(x => x.SearchWidgetModule) }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule  { }

