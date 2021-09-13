import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexWidgetRoutingComponent, FlexWidgetRoutingModule } from './flex-widget.routing';
import { FlexTemplateModule } from '../flex-templates/flex-template.module';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [FlexWidgetRoutingComponent],
  imports: [FlexWidgetRoutingModule, FlexTemplateModule, CommonModule, FormsModule, DeltaCommonsModule,
    ReactiveFormsModule, NgxTrumbowygModule.withConfig({
      svgPath: '/assets/fonts/trumbow-icons.svg',
      semantic: false,
      removeformatPasted: true,
      autogrow: true
    })],
  providers: []
})
export class FlexWidgetModule {
 
}
