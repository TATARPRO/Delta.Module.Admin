import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatesProvinceListComponent } from './State-list.component';
import { StateProvinceFormComponent } from './State-form.component';

const routes: Routes = [
  { path: '', component: StatesProvinceListComponent },
  { path: 'create', component: StateProvinceFormComponent },
  { path: 'edit/:id', component: StateProvinceFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule  { }

export const StatesRoutingComponent = [StatesProvinceListComponent, StateProvinceFormComponent ]
