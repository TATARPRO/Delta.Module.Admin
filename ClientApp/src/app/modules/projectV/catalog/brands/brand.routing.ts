import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandListComponent } from './brand-list.component';
import { BrandFormComponent } from './brand-form.component';

const routes: Routes = [
  { path: '', component: BrandListComponent },
  { path: 'create', component: BrandFormComponent },
  { path: 'edit/:id', component: BrandFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule  { }

export const BrandsRoutingComponent = [BrandListComponent, BrandFormComponent ]
