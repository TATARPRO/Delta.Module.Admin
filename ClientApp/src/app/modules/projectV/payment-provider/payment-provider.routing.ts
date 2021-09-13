import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./providers/providers.module').then(x => x.ProvidersModule) },
  { path: 'flutterwave', loadChildren: () => import('./flutterwave/flutterwave.module').then(x => x.FlutterwaveModule) }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class PaymentProviderRoutingModule { }

export const PaymentProviderRoutingComponent = []
