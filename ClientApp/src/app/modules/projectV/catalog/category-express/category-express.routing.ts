import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryExpressComponent } from './category-express';

const routes: Routes = [
  { path: '', component: CategoryExpressComponent },
  { path: 'edit/:id', component: CategoryExpressComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryExpressRoutingModule  { }

export const CategoryExpressRoutingComponent = [CategoryExpressComponent ]
