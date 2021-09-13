import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductExpressComponent } from './product-express';

const routes: Routes = [
  { path: '', component: ProductExpressComponent },
  { path: 'edit/:id', component: ProductExpressComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductExpressRoutingModule  { }

export const ProductExpressRoutingComponent = [ProductExpressComponent ]
