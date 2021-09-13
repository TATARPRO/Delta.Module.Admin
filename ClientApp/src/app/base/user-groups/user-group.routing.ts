import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGroupFormComponent } from './user-group-form.component';
import { UserGroupListComponent } from './user-group-list.component';

const routes: Routes = [
  { path: '', component: UserGroupListComponent },
  { path: 'create-usergroup', component: UserGroupFormComponent },
  { path: 'edit-usergroup/:id', component: UserGroupFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupRoutingModule  { }

export const UserGroupRoutingComponent = [UserGroupListComponent, UserGroupFormComponent ]
