import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceHistoryComponent } from './price-history.component';

const routes: Routes = [
  { path: '', component: PriceHistoryComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceHistoryRoutingModule  { }

export const PriceHistoryRoutingComponent = [PriceHistoryComponent ]
