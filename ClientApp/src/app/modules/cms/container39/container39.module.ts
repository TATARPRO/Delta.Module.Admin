import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Container39RoutingComponent, Container39RoutingModule } from './container39.routing';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [Container39RoutingComponent],
  imports: [Container39RoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: []
})
export class Container39Module {
 
}
