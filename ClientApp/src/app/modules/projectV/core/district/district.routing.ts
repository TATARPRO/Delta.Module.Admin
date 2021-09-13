import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistrictListComponent } from './district-list.component';

const routes: Routes = [
  { path: '', component: DistrictListComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictsRoutingModule  { }

export const DistrictsRoutingComponent = [DistrictListComponent ]
