import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductClassicPickedComponent } from './product-picked';

const routes: Routes = [
  { path: '', component: ProductClassicPickedComponent },
  { path: 'edit/:id', component: ProductClassicPickedComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductClassicPickedRoutingModule  { }

export const ProductClassicPickedRoutingComponent = [ProductClassicPickedComponent ]
