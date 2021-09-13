import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeRateListComponent } from './exchange-list.component';
import { ExchangeRateFormComponent } from './exchange-form.component';

const routes: Routes = [
  { path: '', component: ExchangeRateListComponent },
  { path: 'create', component: ExchangeRateFormComponent },
  { path: 'edit/:id', component: ExchangeRateFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateRoutingModule { }

export const ExchangeRateRoutingComponent = [ExchangeRateListComponent, ExchangeRateFormComponent ]
