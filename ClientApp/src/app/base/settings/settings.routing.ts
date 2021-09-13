import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { SettingGroupComponent } from './setting-group.component';
import { AppSettingComponent } from './app-setting.component';

const routes: Routes = [
  { path: '', component: SettingGroupComponent },
  { path: ':id', component: AppSettingComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule  { }

export const SettingsRoutingComponent = [SettingGroupComponent, AppSettingComponent ]
