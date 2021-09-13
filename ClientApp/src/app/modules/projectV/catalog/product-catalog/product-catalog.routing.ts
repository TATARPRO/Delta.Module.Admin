import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog';

const routes: Routes = [
  { path: '', component: ProductCatalogComponent },
  { path: 'edit/:id', component: ProductCatalogComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCatalogRoutingModule  { }

export const ProductCatalogRoutingComponent = [ProductCatalogComponent ]
