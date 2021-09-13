import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryMobileComponent } from './category-mobile';

const routes: Routes = [
  { path: '', component: CategoryMobileComponent },
  { path: 'edit/:id', component: CategoryMobileComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryMobileRoutingModule  { }

export const CategoryMobileRoutingComponent = [CategoryMobileComponent ]
