import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingComponent, UsersRoutingModule } from './users.routing';
import { AuthorizationSopeModule } from '../authorization-scope/authorization-scope.module';
import { DeltaCommonsModule } from '../../core/common/common.module';


@NgModule({
  declarations: [UserRoutingComponent],
  imports: [
    UsersRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, AuthorizationSopeModule,
    DeltaCommonsModule
  ],
  providers: []
})
export class UsersModule {
 
}
