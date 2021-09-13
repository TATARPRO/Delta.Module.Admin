import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from './store-list.component';
import { StoreFormComponent } from './store-form.component';

const routes: Routes = [
  { path: '', component: StoreListComponent },
  { path: 'create', component: StoreFormComponent },
  { path: 'edit/:id', component: StoreFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }

export const StoresRoutingComponent = [StoreListComponent, StoreFormComponent ]
