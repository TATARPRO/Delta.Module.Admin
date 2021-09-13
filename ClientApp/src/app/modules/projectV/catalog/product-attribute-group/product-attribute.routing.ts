import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAttributeGroupListComponent } from './product-attribute-list.component';
import { ProductAttributeGroupFormComponent } from './product-attribute-form.component';

const routes: Routes = [
  { path: '', component: ProductAttributeGroupListComponent },
  { path: 'create', component: ProductAttributeGroupFormComponent },
  { path: 'edit/:id', component: ProductAttributeGroupFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAttributeGroupRoutingModule  { }

export const ProductAttributeGroupRoutingComponent = [ProductAttributeGroupListComponent, ProductAttributeGroupFormComponent ]
