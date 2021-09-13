import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductClassicExpressRoutingComponent, ProductClassicExpressRoutingModule } from './product-express.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { ProductSelectionModule } from '../product-selection/product-selection.module';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [ProductClassicExpressRoutingComponent],
  imports: [ProductClassicExpressRoutingModule, CommonModule, FormsModule, ReactiveFormsModule,
    ProductSelectionModule, DeltaCommonsModule],
  providers: [CatalogEndpoints, CoreVEndpoints]
})
export class ProductClassicExpressModule {
 
}
