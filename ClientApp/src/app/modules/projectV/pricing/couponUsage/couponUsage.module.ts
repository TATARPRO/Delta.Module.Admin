import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CouponUsageRoutingComponent, CouponUsageRoutingModule } from './couponUsage.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { PricingEndpoints } from '../pricingEndpoints';


@NgModule({
  declarations: [CouponUsageRoutingComponent],
  imports: [CouponUsageRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [PricingEndpoints]
})
export class CouponUsageModule {
 
}
