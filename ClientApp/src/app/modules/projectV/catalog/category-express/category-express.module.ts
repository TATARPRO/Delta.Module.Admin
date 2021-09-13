import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryExpressRoutingComponent, CategoryExpressRoutingModule } from './category-express.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [CategoryExpressRoutingComponent],
  imports: [CategoryExpressRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CatalogEndpoints]
})
export class CategoryExpressModule {
 
}
