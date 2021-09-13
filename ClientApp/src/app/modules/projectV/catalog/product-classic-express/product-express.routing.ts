import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductClassicExpressComponent } from './product-express';

const routes: Routes = [
  { path: '', component: ProductClassicExpressComponent },
  { path: 'edit/:id', component: ProductClassicExpressComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductClassicExpressRoutingModule  { }

export const ProductClassicExpressRoutingComponent = [ProductClassicExpressComponent ]
