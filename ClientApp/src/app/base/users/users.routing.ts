import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'create-user', component: UserFormComponent },
  { path: 'edit-user/:id', component: UserFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule  { }

export const UserRoutingComponent = [UserListComponent, UserFormComponent ]
