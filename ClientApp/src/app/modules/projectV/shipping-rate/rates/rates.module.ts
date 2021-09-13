import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatesRoutingComponent, RatesRoutingModule } from './rates.routing';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { TaxEndpoints } from '../../tax/taxEndpoints';
import { ShippingProviderEndpoints } from '../../shipping-provider/shipProviderEndpoints';


@NgModule({
  declarations: [RatesRoutingComponent],
  imports: [RatesRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule ],
  providers: [CoreVEndpoints, TaxEndpoints, ShippingProviderEndpoints]
})
export class RatesModule {
 
}
