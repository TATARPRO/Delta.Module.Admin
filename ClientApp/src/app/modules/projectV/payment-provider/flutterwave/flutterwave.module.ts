import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlutterwaveRoutingComponent, FlutterwaveRoutingModule } from './flutterwave.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { PaymentProviderEndpoints } from '../payment-providerEndpoints';


@NgModule({
  declarations: [FlutterwaveRoutingComponent],
  imports: [FlutterwaveRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [PaymentProviderEndpoints]
})
export class FlutterwaveModule {
 
}
