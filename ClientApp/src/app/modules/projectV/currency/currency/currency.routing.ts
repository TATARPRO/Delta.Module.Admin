import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyListComponent } from './currency-list.component';
import { CurrencyFormComponent } from './currency-form.component';

const routes: Routes = [
  { path: '', component: CurrencyListComponent },
  { path: 'create', component: CurrencyFormComponent },
  { path: 'edit/:id', component: CurrencyFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }

export const CurrencyRoutingComponent = [CurrencyListComponent, CurrencyFormComponent ]
