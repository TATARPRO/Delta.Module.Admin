import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourceRoleRoutingComponent, ResourceRoleRoutingModule } from './resource-roles.routing';


@NgModule({
  declarations: [ResourceRoleRoutingComponent],
  imports: [ResourceRoleRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class ResourceRoleModule {
 
}
