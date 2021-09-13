import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPickedComponent } from './product-picked';

const routes: Routes = [
  { path: '', component: ProductPickedComponent },
  { path: 'edit/:id', component: ProductPickedComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPickedRoutingModule  { }

export const ProductPickedRoutingComponent = [ProductPickedComponent ]
