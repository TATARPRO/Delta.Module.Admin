import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./currency/currency.module').then(x => x.CurrencyModule) },
  { path: 'currency', loadChildren: () => import('./currency/currency.module').then(x => x.CurrencyModule) },
  { path: 'exchange-rate', loadChildren: () => import('./exchange-rate/exchange.module').then(x => x.ExchangeRateModule) }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class CurrencyRoutingModule { }

export const CurrencyRoutingComponent = []
