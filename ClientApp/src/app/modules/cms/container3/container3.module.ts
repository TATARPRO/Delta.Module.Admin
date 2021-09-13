import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Container3RoutingComponent, Container3RoutingModule } from './container3.routing';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [Container3RoutingComponent],
  imports: [Container3RoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: []
})
export class Container3Module {
 
}
