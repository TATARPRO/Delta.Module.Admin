import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsRoutingComponent, WidgetsRoutingModule } from './widgets.routing';


@NgModule({
  declarations: [WidgetsRoutingComponent],
  imports: [WidgetsRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class WidgetsModule {
 
}
