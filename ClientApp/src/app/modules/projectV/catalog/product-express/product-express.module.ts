import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductExpressRoutingComponent, ProductExpressRoutingModule } from './product-express.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';


@NgModule({
  declarations: [ProductExpressRoutingComponent],
  imports: [ProductExpressRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CatalogEndpoints, CoreVEndpoints]
})
export class ProductExpressModule {
 
}
