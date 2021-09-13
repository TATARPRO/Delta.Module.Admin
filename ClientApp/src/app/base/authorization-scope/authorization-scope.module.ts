import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationSopeComponent } from './authorization-scope.component';
import { DeltaCommonsModule } from '../../core/common/common.module';


@NgModule({
  declarations: [AuthorizationSopeComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DeltaCommonsModule],
  exports: [AuthorizationSopeComponent],
  providers: []
})
export class AuthorizationSopeModule {
 
}
