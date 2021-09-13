import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuRoutingComponent, MenuRoutingModule } from './menu.routing';
import { TreeModule } from '@circlon/angular-tree-component';
import { DeltaCommonsModule } from '../../../core/common/common.module';


@NgModule({
  declarations: [MenuRoutingComponent],
  imports: [MenuRoutingModule, CommonModule, FormsModule, ReactiveFormsModule, TreeModule, DeltaCommonsModule],
  providers: []
})
export class MenuModule {
 
}
