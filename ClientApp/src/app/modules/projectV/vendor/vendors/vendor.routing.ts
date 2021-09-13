import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorListComponent } from './vendor-list.component';
import { VendorFormComponent } from './vendor-form.component';

const routes: Routes = [
  { path: '', component: VendorListComponent },
  { path: 'create', component: VendorFormComponent },
  { path: 'edit/:id', component: VendorFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorsRoutingModule  { }

export const VendorsRoutingComponent = [VendorListComponent, VendorFormComponent ]
