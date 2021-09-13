import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAttributeListComponent } from './product-attribute-list.component';
import { ProductAttributeFormComponent } from './product-attribute-form.component';

const routes: Routes = [
  { path: '', component: ProductAttributeListComponent },
  { path: 'create', component: ProductAttributeFormComponent },
  { path: 'edit/:id', component: ProductAttributeFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductAttributeRoutingModule  { }

export const ProductAttributeRoutingComponent = [ProductAttributeListComponent, ProductAttributeFormComponent ]
