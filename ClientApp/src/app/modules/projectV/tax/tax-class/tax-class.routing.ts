import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxClassListComponent } from './tax-class-list.component';
import { TaxClassFormComponent } from './tax-class-form.component';

const routes: Routes = [
  { path: '', component: TaxClassListComponent },
  { path: 'create', component: TaxClassFormComponent },
  { path: 'edit/:id', component: TaxClassFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxClassRoutingModule { }

export const TaxClassRoutingComponent = [TaxClassListComponent, TaxClassFormComponent ]
