import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YiwugoRoutingComponent, YiwugoRoutingModule } from './yiwugo.routing';
import { DeltaCommonsModule } from '../../../core/common/common.module';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { CoreVEndpoints } from '../core/corev-endpoints';
import { TaxEndpoints } from '../tax/taxEndpoints';


@NgModule({
  declarations: [YiwugoRoutingComponent],
  imports: [YiwugoRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [EndpointMetadata, CoreVEndpoints, TaxEndpoints]
})
export class YiwugoModule {
 
}
