import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCatalogRoutingComponent, ProductCatalogRoutingModule } from './product-catalog.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';


@NgModule({
  declarations: [ProductCatalogRoutingComponent],
  imports: [ProductCatalogRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CatalogEndpoints, CoreVEndpoints]
})
export class ProductCatalogModule {
 
}
