import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list.component';
import { CountryFormComponent } from './country-form.component';

const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'create', component: CountryFormComponent },
  { path: 'edit/:id', component: CountryFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule  { }

export const CountryRoutingComponent = [CountryListComponent, CountryFormComponent ]
