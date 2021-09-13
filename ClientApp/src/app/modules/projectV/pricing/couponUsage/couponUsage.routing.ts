import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponUsageComponent } from './couponUsage.component';

const routes: Routes = [
  { path: '', component: CouponUsageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponUsageRoutingModule { }

export const CouponUsageRoutingComponent = [CouponUsageComponent ]
