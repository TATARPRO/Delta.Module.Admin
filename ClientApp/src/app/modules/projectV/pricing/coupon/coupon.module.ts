import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CouponRoutingComponent, CouponRoutingModule } from './coupon.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { PricingEndpoints } from '../pricingEndpoints';
import { ProductSelectionModule } from '../../catalog/product-selection/product-selection.module';


@NgModule({
  declarations: [CouponRoutingComponent],
  imports: [CouponRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule, ProductSelectionModule],
  providers: [PricingEndpoints]
})
export class CouponModule {
 
}
