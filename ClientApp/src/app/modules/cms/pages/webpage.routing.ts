import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageListComponent } from './page-list.component';
import { WebPageFormComponent } from './page-form.component';

const routes: Routes = [
  { path: '', component: PageListComponent },
  { path: 'create', component: WebPageFormComponent },
  { path: 'edit/:id', component: WebPageFormComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebPageRoutingModule  { }

export const WebPageRoutingComponent = [PageListComponent, WebPageFormComponent ]
