import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list.component';
import { RoleFormComponent } from './role-form.component';

const routes: Routes = [
  { path: '', component: RoleListComponent },
  { path: 'create-role', component: RoleFormComponent },
  { path: 'edit-role/:id', component: RoleFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule  { }

export const RolesRoutingComponent = [RoleListComponent, RoleFormComponent ]
