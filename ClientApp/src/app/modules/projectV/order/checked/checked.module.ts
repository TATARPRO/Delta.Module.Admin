import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckedRoutingComponent, CheckedRoutingModule } from './checked.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { OrderEndpoints } from '../orderEndpoints';
import { NgSelect2Module } from 'ng-select2'
import { ProductSelectionModule } from '../../catalog/product-selection/product-selection.module';


@NgModule({
  declarations: [CheckedRoutingComponent],
  imports: [CheckedRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule, NgSelect2Module, ProductSelectionModule],
  providers: [CoreVEndpoints, OrderEndpoints]
})
export class CheckedModule {
 
}
