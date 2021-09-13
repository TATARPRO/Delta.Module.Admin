import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Container6RoutingComponent, Container6RoutingModule } from './container6.routing';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [Container6RoutingComponent],
  imports: [Container6RoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: []
})
export class Container6Module {
 
}
