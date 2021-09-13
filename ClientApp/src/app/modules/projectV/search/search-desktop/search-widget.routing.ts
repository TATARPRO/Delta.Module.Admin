import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchWidgetComponent } from './search-widget';

const routes: Routes = [
  { path: '', component: SearchWidgetComponent },
  { path: 'edit/:id', component: SearchWidgetComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchWidgetRoutingModule  { }

export const SearchWidgetRoutingComponent = [SearchWidgetComponent ]
