import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YiwugoFormComponent } from './yiwugo-form.component';

const routes: Routes = [
  { path: '', component: YiwugoFormComponent },
  { path: 'yiwugo', component: YiwugoFormComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YiwugoRoutingModule  { }

export const YiwugoRoutingComponent = [YiwugoFormComponent ]
