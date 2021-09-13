import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartisanSettingComponent } from './partisan-settings.component';
import { PartisanVendorsComponent } from './partisan-list.component';

const routes: Routes = [
  { path: '', component: PartisanVendorsComponent },
  { path: 'settings/:id', component: PartisanSettingComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartisanVendorRoutingModule  { }

export const PartisanVendorRoutingComponent = [PartisanVendorsComponent, PartisanSettingComponent ]
