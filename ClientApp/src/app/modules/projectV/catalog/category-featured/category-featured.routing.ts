import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFeaturedComponent } from './category-featured';

const routes: Routes = [
  { path: '', component: CategoryFeaturedComponent },
  { path: 'edit/:id', component: CategoryFeaturedComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryFeaturedRoutingModule  { }

export const CategoryFeaturedRoutingComponent = [CategoryFeaturedComponent ]
