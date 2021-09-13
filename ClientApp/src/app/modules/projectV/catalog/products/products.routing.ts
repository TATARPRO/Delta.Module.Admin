import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductFormComponent } from './product-form.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule  { }

export const ProductRoutingComponent = [ProductListComponent, ProductFormComponent ]
