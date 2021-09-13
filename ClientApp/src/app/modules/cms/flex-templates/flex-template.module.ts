import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexTemplateRoutingComponent, FlexTemplateRoutingModule } from './flex-template.routing';
import { FlexTemplateComponent, } from './flex-template.component';


@NgModule({
  declarations: [FlexTemplateRoutingComponent, FlexTemplateComponent],
  imports: [FlexTemplateRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FlexTemplateComponent],
  providers: []
})
export class FlexTemplateModule {
 
}
