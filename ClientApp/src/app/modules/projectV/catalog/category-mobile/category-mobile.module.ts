import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryMobileRoutingComponent, CategoryMobileRoutingModule } from './category-mobile.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [CategoryMobileRoutingComponent],
  imports: [CategoryMobileRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CatalogEndpoints]
})
export class CategoryMobileModule {
 
}
