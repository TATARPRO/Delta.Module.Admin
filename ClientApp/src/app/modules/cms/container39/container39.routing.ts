import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container39Component } from './container39';

const routes: Routes = [
  { path: '', component: Container39Component },
  { path: 'edit/:id', component: Container39Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container39RoutingModule  { }

export const Container39RoutingComponent = [Container39Component ]
