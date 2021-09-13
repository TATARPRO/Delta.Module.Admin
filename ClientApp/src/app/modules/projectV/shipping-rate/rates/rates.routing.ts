import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateListComponent } from './rates-list.component';
import { RateFormComponent } from './rates-form.component';

const routes: Routes = [
  { path: '', component: RateListComponent },
  { path: 'create', component: RateFormComponent },
  { path: 'edit/:id', component: RateFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesRoutingModule { }

export const RatesRoutingComponent = [RateListComponent, RateFormComponent ]
