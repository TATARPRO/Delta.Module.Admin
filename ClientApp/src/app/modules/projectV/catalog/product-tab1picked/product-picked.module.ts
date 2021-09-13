import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductTabPickedRoutingComponent, ProductTabPickedRoutingModule } from './product-picked.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { ProductSelectionModule } from '../product-selection/product-selection.module';


@NgModule({
  declarations: [ProductTabPickedRoutingComponent],
  imports: [ProductTabPickedRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule,
    ProductSelectionModule],
  providers: [CatalogEndpoints, EndpointMetadata, CoreVEndpoints]
})
export class ProductTabPickedModule {
 
}
