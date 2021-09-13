import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingComponent, SettingsRoutingModule } from './settings.routing';


@NgModule({
  declarations: [SettingsRoutingComponent],
  imports: [SettingsRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: []
})
export class SettingsModule {
 
}
