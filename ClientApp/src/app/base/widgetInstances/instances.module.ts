import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetInstanceRoutingComponent, WidgetInstanceRoutingModule } from './instances.routing';


@NgModule({
  declarations: [WidgetInstanceRoutingComponent],
  imports: [WidgetInstanceRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class WidgetInstanceModule {
 
}
