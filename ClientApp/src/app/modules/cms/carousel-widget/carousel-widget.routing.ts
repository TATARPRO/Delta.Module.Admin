import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselWidgetComponent } from './carousel-widget';

const routes: Routes = [
  { path: '', component: CarouselWidgetComponent },
  { path: 'edit/:id', component: CarouselWidgetComponent },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarouselRoutingModule  { }

export const CarouselRoutingComponent = [CarouselWidgetComponent ]
