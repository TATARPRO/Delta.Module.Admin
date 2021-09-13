import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { WidgetInstanceComponent } from './instances.component';

const routes: Routes = [
  { path: '', component: WidgetInstanceComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetInstanceRoutingModule  { }

export const WidgetInstanceRoutingComponent = [ WidgetInstanceComponent ]
