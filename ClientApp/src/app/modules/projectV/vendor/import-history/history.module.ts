import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryRoutingComponent, HistoryRoutingModule } from './history.routing';
import { VendorEndpoints } from '../vendor-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [HistoryRoutingComponent],
  imports: [HistoryRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [VendorEndpoints]
})
export class HistoryModule {
 
}
