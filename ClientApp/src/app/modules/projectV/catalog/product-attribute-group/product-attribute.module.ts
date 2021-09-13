import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAttributeGroupRoutingComponent, ProductAttributeGroupRoutingModule } from './product-attribute.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [ProductAttributeGroupRoutingComponent],
  imports: [ProductAttributeGroupRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CatalogEndpoints]
})
export class ProductAttributeGroupModule {
 
}
