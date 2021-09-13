import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryRoutingComponent, CountryRoutingModule } from './country.routing';
import { CoreVEndpoints } from '../corev-endpoints';
import { DeltaCommonsModule } from '../../../../core/common/common.module';


@NgModule({
  declarations: [CountryRoutingComponent],
  imports: [CountryRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [CoreVEndpoints]
})
export class CountryModule {
 
}
