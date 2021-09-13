import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryDesktopComponent } from './category-desktop';

const routes: Routes = [
  { path: '', component: CategoryDesktopComponent },
  { path: 'edit/:id', component: CategoryDesktopComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryDesktopRoutingModule  { }

export const CategoryDesktopRoutingComponent = [CategoryDesktopComponent ]
