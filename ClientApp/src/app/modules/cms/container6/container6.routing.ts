import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container6Component } from './container6';

const routes: Routes = [
  { path: '', component: Container6Component },
  { path: 'edit/:id', component: Container6Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container6RoutingModule  { }

export const Container6RoutingComponent = [Container6Component ]
