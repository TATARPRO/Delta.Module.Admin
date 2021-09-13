import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesRoutingComponent, RolesRoutingModule } from './roles.routing';


@NgModule({
  declarations: [RolesRoutingComponent],
  imports: [RolesRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class RolesModule {
 
}
