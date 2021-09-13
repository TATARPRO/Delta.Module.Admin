import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Route, PreloadAllModules } from '@angular/router';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { NavRightComponent } from './nav-right/nav-right.component';
import { NavSettingComponent } from './nav-setting/nav-setting.component';
import { DashboardComponent } from './base/dashboard/dashboard.component';
import { EndpointMetadata } from './core/endpointMeta';

class extension {
  public static getRoutes(): Route[] {
    return []
  }

  public static getComponents(): Component[] {
    return [];
  }
}

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', redirectTo: '' },
  { path: 'walkthrough', component: DashboardComponent, pathMatch: 'full' },
  { path: 'admin-area/resource-roles', loadChildren: () => import('./base/resource-roles/resource-roles.module').then(x => x.ResourceRoleModule) },
  { path: 'admin-area/roles', loadChildren: () => import('./base/roles/roles.module').then(x => x.RolesModule) },
  { path: 'settings', loadChildren: () => import('./base/settings/settings.module').then(x => x.SettingsModule) },
  { path: 'admin-area/usergroups', loadChildren: () => import('./base/user-groups/user-group.module').then(x => x.UserGroupModule) },
  { path: 'admin-area/users', loadChildren: () => import('./base/users/users.module').then(x => x.UsersModule) },
  { path: 'widgets', loadChildren: () => import('./base/widgets/widgets.module').then(x => x.WidgetsModule) },
  { path: 'widget-instances', loadChildren: () => import('./base/widgetInstances/instances.module').then(x => x.WidgetInstanceModule) },
  { path: 'module', loadChildren: () => import('./modules/modules.module').then(x => x.ModulesModule) }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [EndpointMetadata]
})
export class AppRoutingModule { }

export const RoutingComponent = [
  NavLeftComponent, NavTopComponent,
  NavRightComponent, NavSettingComponent,
  DashboardComponent
]
