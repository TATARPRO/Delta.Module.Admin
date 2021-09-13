import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Container2RoutingComponent, Container2RoutingModule } from './container2.routing';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [Container2RoutingComponent],
  imports: [Container2RoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: []
})
export class Container2Module {
 
}
