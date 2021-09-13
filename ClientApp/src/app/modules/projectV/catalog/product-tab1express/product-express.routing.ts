import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { ProductExpressTabComponent } from './product-express';

const routes: Routes = [
  { path: '', component: ProductExpressTabComponent },
  { path: 'edit/:id', component: ProductExpressTabComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductExpressTabRoutingModule  { }

export const ProductExpressTabRoutingComponent = [ProductExpressTabComponent ]
