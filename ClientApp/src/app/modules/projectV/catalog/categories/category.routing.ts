import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list.component';
import { CategoryFormComponent } from './category-form.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'create', component: CategoryFormComponent },
  { path: 'edit/:id', component: CategoryFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule  { }

export const CategoryRoutingComponent = [CategoryListComponent, CategoryFormComponent ]
