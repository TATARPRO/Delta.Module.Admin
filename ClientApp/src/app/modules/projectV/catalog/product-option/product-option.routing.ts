import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductOptionListComponent } from './product-option-list.component';
import { ProductOptionFormComponent } from './product-option-form.component';

const routes: Routes = [
  { path: '', component: ProductOptionListComponent },
  { path: 'create', component: ProductOptionFormComponent },
  { path: 'edit/:id', component: ProductOptionFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductOptionRoutingModule  { }

export const ProductOptionRoutingComponent = [ProductOptionListComponent, ProductOptionFormComponent ]
