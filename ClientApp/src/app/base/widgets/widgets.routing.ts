import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { WidgetListComponent } from './widget-list.component';

const routes: Routes = [
  { path: '', component: WidgetListComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule  { }

export const WidgetsRoutingComponent = [WidgetListComponent ]
