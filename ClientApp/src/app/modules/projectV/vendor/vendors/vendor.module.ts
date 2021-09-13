import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorsRoutingComponent, VendorsRoutingModule } from './vendor.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { VendorEndpoints } from '../vendor-endpoints';


@NgModule({
  declarations: [VendorsRoutingComponent],
  imports: [VendorsRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [VendorEndpoints]
})
export class VendorsModule {
 
}
