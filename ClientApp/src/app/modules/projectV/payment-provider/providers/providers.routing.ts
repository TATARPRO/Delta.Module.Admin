import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderListComponent } from './providers-list.component';

const routes: Routes = [
  { path: '', component: ProviderListComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }

export const ProvidersRoutingComponent = [ProviderListComponent ]
