import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselRoutingComponent, CarouselRoutingModule } from './carousel-widget.routing';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [CarouselRoutingComponent],
  imports: [CarouselRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule,
    NgxTrumbowygModule.withConfig({
    svgPath: '/assets/fonts/trumbow-icons.svg',
    semantic: false,
    removeformatPasted: false,
    autogrow: true
  })],
  providers: []
})
export class CarouselWidgetModule {
 
}
