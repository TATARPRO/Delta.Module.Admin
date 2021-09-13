import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExchangeRateRoutingComponent, ExchangeRateRoutingModule } from './exchange.routing';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { CurrencyEndpoints } from '../currencyEndpoints';


@NgModule({
  declarations: [ExchangeRateRoutingComponent],
  imports: [ExchangeRateRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule,
    NgxTrumbowygModule.withConfig({
      svgPath: '/assets/fonts/trumbow-icons.svg',
      semantic: false,
      removeformatPasted: false,
      autogrow: true
    })],
  providers: [CoreVEndpoints, CurrencyEndpoints]
})
export class ExchangeRateModule {
 
}
