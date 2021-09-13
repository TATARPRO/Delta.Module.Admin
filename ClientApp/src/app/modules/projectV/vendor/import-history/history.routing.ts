import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history.component';

const routes: Routes = [
  { path: '', component: HistoryComponent },
  { path: 'import-history', component: HistoryComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule  { }

export const HistoryRoutingComponent = [HistoryComponent ]
