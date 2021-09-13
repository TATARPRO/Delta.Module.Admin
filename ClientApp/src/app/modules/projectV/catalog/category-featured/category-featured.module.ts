import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFeaturedRoutingComponent, CategoryFeaturedRoutingModule } from './category-featured.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [CategoryFeaturedRoutingComponent],
  imports: [CategoryFeaturedRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CatalogEndpoints]
})
export class CategoryFeaturedModule {
 
}
