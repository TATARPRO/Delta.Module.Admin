import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckedListComponent } from './checked-list.component';
import { CheckedFormComponent } from './checked-form.component';

const routes: Routes = [
  { path: '', component: CheckedListComponent },
  { path: 'create', component: CheckedFormComponent },
  { path: 'edit/:customerId/:id', component: CheckedFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckedRoutingModule { }

export const CheckedRoutingComponent = [CheckedListComponent, CheckedFormComponent ]
