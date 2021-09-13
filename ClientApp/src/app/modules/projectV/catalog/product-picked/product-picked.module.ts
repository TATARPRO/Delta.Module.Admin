import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPickedRoutingComponent, ProductPickedRoutingModule } from './product-picked.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { ProductSelectionModule } from '../product-selection/product-selection.module';


@NgModule({
  declarations: [ProductPickedRoutingComponent],
  imports: [ProductPickedRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule,
  ProductSelectionModule],
  providers: [CatalogEndpoints, CoreVEndpoints]
})
export class ProductPickedModule {
 
}
