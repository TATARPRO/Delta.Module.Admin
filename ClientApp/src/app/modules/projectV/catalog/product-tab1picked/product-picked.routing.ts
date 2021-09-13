import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ProductTabPickedComponent } from './product-picked';

const routes: Routes = [
  { path: '', component: ProductTabPickedComponent },
  { path: 'edit/:id', component: ProductTabPickedComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductTabPickedRoutingModule  { }

export const ProductTabPickedRoutingComponent = [ProductTabPickedComponent ]
