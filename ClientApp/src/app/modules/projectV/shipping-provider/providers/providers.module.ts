import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvidersRoutingComponent, ProvidersRoutingModule } from './providers.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { ShippingProviderEndpoints } from '../shipProviderEndpoints';


@NgModule({
  declarations: [ProvidersRoutingComponent],
  imports: [ProvidersRoutingModule, CommonModule, FormsModule, ReactiveFormsModule,
    DeltaCommonsModule],
  providers: [CoreVEndpoints, ShippingProviderEndpoints]
})
export class ProvidersModule {
 
}
