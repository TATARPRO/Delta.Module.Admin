import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchWidgetRoutingComponent, SearchWidgetRoutingModule } from './search-widget.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { EndpointMetadata } from '../../../../core/endpointMeta';


@NgModule({
  declarations: [SearchWidgetRoutingComponent],
  imports: [SearchWidgetRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [EndpointMetadata]
})
export class SearchWidgetModule {
 
}
