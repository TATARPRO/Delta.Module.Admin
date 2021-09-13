import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Container210RoutingComponent, Container210RoutingModule } from './container210.routing';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [Container210RoutingComponent],
  imports: [Container210RoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: []
})
export class Container210Module {
 
}
