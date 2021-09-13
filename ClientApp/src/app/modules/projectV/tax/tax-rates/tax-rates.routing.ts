import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxRatesListComponent } from './tax-rates-list.component';
import { TaxRatesFormComponent } from './tax-rates-form.component';

const routes: Routes = [
  { path: '', component: TaxRatesListComponent },
  { path: 'create', component: TaxRatesFormComponent },
  { path: 'edit/:id', component: TaxRatesFormComponent },
  { path: 'import', component: TaxRatesFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRatesRoutingModule { }

export const TaxRatesRoutingComponent = [TaxRatesListComponent, TaxRatesFormComponent ]
