import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceRolesComponent } from './resource-roles.component';

const routes: Routes = [
  { path: '', component: ResourceRolesComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoleRoutingModule  { }

export const ResourceRoleRoutingComponent = [ResourceRolesComponent ]
