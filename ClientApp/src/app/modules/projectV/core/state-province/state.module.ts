import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatesRoutingComponent, StatesRoutingModule } from './state.routing';
import { CoreVEndpoints } from '../corev-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [StatesRoutingComponent],
  imports: [StatesRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CoreVEndpoints]
})
export class StatesModule {
 
}
