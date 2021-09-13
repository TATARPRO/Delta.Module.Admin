import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryRoutingComponent, CategoryRoutingModule } from './category.routing';
import { CatalogEndpoints } from '../catalog-endpoints';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [CategoryRoutingComponent],
  imports: [CategoryRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule,
    NgxTrumbowygModule.withConfig({
      svgPath: '/assets/fonts/trumbow-icons.svg',
      semantic: false,
      removeformatPasted: false,
      autogrow: true
    })],
  providers: [CatalogEndpoints]
})
export class CategoriesModule {
 
}
