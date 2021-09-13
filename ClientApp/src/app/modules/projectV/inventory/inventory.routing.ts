import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./store/store.module').then(x => x.StoresModule) },
  { path: 'stores', loadChildren: () => import('./store/store.module').then(x => x.StoresModule) }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class InventoryVRoutingModule { }

export const InventoryVRoutingComponent = []
