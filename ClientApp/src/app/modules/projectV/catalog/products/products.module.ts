import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingComponent, ProductsRoutingModule } from './products.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { TaxEndpoints } from '../../tax/taxEndpoints';
import { ProductSelectionModule } from '../product-selection/product-selection.module';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [ProductRoutingComponent],
  imports: [ProductsRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule,
    NgxTrumbowygModule.withConfig({
      svgPath: '/assets/fonts/trumbow-icons.svg',
      semantic: false,
      removeformatPasted: false,
      autogrow: true
    }), ProductSelectionModule],
  exports: [],
  providers: [CatalogEndpoints, CoreVEndpoints, TaxEndpoints]
})
export class ProductsModule {
 
}
