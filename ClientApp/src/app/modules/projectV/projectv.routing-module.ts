import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./catalog/catalog.module').then(x => x.CatalogModule) },
  { path: 'catalog', loadChildren: () => import('./catalog/catalog.module').then(x => x.CatalogModule) },
  { path: 'currency', loadChildren: () => import('./currency/currency.module').then(x => x.CurrencyModule) },
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(x => x.InventoryModule) },
  { path: 'core', loadChildren: () => import('./core/corev.module').then(x => x.CoreVModule) },
  { path: 'orders', loadChildren: () => import('./order/order.module').then(x => x.OrderModule) },
  { path: 'payment-providers', loadChildren: () => import('./payment-provider/payment-provider.module').then(x => x.PaymentProviderModule) },
  { path: 'pricing', loadChildren: () => import('./pricing/pricing.module').then(x => x.PricingModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then(x => x.SearchModule) },
  { path: 'shipping-providers', loadChildren: () => import('./shipping-provider/shipping-provider.module').then(x => x.ShippingProviderModule) },
  { path: 'shipping-rates', loadChildren: () => import('./shipping-rate/shipping-rate.module').then(x => x.ShippingRateModule) },
  { path: 'tax', loadChildren: () => import('./tax/tax.module').then(x => x.TaxModule) },
  { path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then(x => x.VendorModule) },
  { path: 'yiwugo', loadChildren: () => import('./yiwugo/yiwugo.module').then(x => x.YiwugoModule) }
 ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class ProjectVRoutingModule { }

export const ProjectVRoutingComponent = []
