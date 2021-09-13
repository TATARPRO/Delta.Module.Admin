import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuListComponent } from './menu-list.component';
import { MenuSettingsComponent } from './menu-settings';
import { MenuFormComponent } from './menu-form';

const routes: Routes = [
  { path: '', component: MenuListComponent },
  { path: 'create', component: MenuFormComponent },
  { path: 'edit/:id', component: MenuFormComponent },
  { path: 'settings/:id', component: MenuSettingsComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule  { }

export const MenuRoutingComponent = [MenuFormComponent, MenuListComponent,
  MenuSettingsComponent ]
