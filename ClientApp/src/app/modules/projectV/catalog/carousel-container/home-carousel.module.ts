import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeCarouselRoutingComponent, HomeCarouselRoutingModule } from './home-carousel.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [HomeCarouselRoutingComponent],
  imports: [HomeCarouselRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: []
})
export class HomeCarouselModule {
 
}
