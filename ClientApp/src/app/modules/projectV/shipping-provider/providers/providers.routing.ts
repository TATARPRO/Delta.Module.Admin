import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderListComponent } from './providers-list.component';
import { ProviderFormComponent } from './providers-form.component';

const routes: Routes = [
  { path: '', component: ProviderListComponent },
  { path: 'create', component: ProviderFormComponent },
  { path: 'edit/:id', component: ProviderFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }

export const ProvidersRoutingComponent = [ProviderListComponent, ProviderFormComponent ]
