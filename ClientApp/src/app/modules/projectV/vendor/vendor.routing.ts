import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./vendors/vendor.module').then(x => x.VendorsModule) },
  { path: 'vendors', loadChildren: () => import('./vendors/vendor.module').then(x => x.VendorsModule) },
  { path: 'import-history', loadChildren: () => import('./import-history/history.module').then(x => x.HistoryModule) },
  { path: 'partisan-vendors', loadChildren: () => import('./partisan-api/partisan.module').then(x => x.PartisanVendorModule) }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class VendorRoutingModule { }

export const VendorRoutingComponent = []

