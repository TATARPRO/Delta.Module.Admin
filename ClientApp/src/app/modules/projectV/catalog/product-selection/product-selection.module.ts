import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogEndpoints } from '../catalog-endpoints';
import { ProductSelectionComponent } from './product-selection.component';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [ProductSelectionComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  exports: [ProductSelectionComponent],
  providers: [CatalogEndpoints]
})
export class ProductSelectionModule {
 
}
