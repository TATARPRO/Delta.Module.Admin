import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductExpressTabRoutingComponent, ProductExpressTabRoutingModule } from './product-express.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';


@NgModule({
  declarations: [ProductExpressTabRoutingComponent],
  imports: [ProductExpressTabRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CatalogEndpoints, EndpointMetadata, CoreVEndpoints]
})
export class ProductExpressTabModule {
 
}
