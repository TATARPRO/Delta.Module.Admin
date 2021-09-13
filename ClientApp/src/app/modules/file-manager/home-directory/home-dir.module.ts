import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeDirectoryRoutingComponent, HomeDirectoryRoutingModule } from './home-dir.routing';
import { DeltaCommonsModule } from '../../../core/common/common.module';
import { FileManagerEndpoints } from '../fileEndpoints';


@NgModule({
  declarations: [HomeDirectoryRoutingComponent],
  imports: [HomeDirectoryRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  providers: [FileManagerEndpoints]
})
export class HomeDirectoryModule {
 
}
