import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartisanVendorRoutingComponent, PartisanVendorRoutingModule } from './partisan.routing';
import { VendorEndpoints } from '../vendor-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [PartisanVendorRoutingComponent],
  imports: [PartisanVendorRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [VendorEndpoints]
})
export class PartisanVendorModule {
 
}
