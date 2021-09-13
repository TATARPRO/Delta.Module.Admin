import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tax-rates/tax-rates.module').then(x => x.TaxRatesModule) },
  { path: 'tax-rates', loadChildren: () => import('./tax-rates/tax-rates.module').then(x => x.TaxRatesModule) },
  { path: 'tax-class', loadChildren: () => import('./tax-class/tax-class.module').then(x => x.TaxClassModule) }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class TaxRoutingModule { }

export const TaxRoutingComponent = []
