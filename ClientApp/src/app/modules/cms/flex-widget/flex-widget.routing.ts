import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { FlexWidgetComponent } from './flex-widget';

const routes: Routes = [
  { path: '', component: FlexWidgetComponent },
  { path: 'edit/:id', component: FlexWidgetComponent },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlexWidgetRoutingModule  { }

export const FlexWidgetRoutingComponent = [FlexWidgetComponent ]
