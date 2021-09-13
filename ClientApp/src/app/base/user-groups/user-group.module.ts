import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserGroupRoutingComponent, UserGroupRoutingModule } from './user-group.routing';


@NgModule({
  declarations: [UserGroupRoutingComponent],
  imports: [UserGroupRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class UserGroupModule {
 
}
