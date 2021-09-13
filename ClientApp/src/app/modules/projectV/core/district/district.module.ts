import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistrictsRoutingComponent, DistrictsRoutingModule } from './district.routing';
import { CoreVEndpoints } from '../corev-endpoints';


@NgModule({
  declarations: [DistrictsRoutingComponent],
  imports: [DistrictsRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [CoreVEndpoints]
})
export class DistrictsModule {
 
}
