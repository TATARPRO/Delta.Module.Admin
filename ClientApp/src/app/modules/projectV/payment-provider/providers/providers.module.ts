import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProvidersRoutingComponent, ProvidersRoutingModule } from './providers.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { PaymentProviderEndpoints } from '../payment-providerEndpoints';


@NgModule({
  declarations: [ProvidersRoutingComponent],
  imports: [ProvidersRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [PaymentProviderEndpoints]
})
export class ProvidersModule {
 
}
