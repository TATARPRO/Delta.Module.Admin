import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxRatesRoutingComponent, TaxRatesRoutingModule } from './tax-rates.routing';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { DeltaCommonsModule } from '../../../../core/common/common.module';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { TaxEndpoints } from '../taxEndpoints';


@NgModule({
  declarations: [TaxRatesRoutingComponent],
  imports: [TaxRatesRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule,
    NgxTrumbowygModule.withConfig({
      svgPath: '/assets/fonts/trumbow-icons.svg',
      semantic: false,
      removeformatPasted: false,
      autogrow: true
    })],
  providers: [CoreVEndpoints, TaxEndpoints]
})
export class TaxRatesModule {
 
}
