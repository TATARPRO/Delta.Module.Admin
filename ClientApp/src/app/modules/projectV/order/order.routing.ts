import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./checked/checked.module').then(x => x.CheckedModule) },
  { path: 'checked', loadChildren: () => import('./checked/checked.module').then(x => x.CheckedModule) }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class OrderRoutingModule { }

export const OrderRoutingComponent = []
