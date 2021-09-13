import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponListComponent } from './coupon-list.component';
import { CouponFormComponent } from './coupon-form.component';

const routes: Routes = [
  { path: '', component: CouponListComponent },
  { path: 'create', component: CouponFormComponent },
  { path: 'edit/:id', component: CouponFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }

export const CouponRoutingComponent = [CouponListComponent, CouponFormComponent ]
