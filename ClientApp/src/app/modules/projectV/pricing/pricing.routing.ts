import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./coupon/coupon.module').then(x => x.CouponModule) },
  { path: 'coupon', loadChildren: () => import('./coupon/coupon.module').then(x => x.CouponModule) },
  { path: 'coupon-usage', loadChildren: () => import('./couponUsage/couponUsage.module').then(x => x.CouponUsageModule) }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class PricingRoutingModule { }

export const PricingRoutingComponent = []
