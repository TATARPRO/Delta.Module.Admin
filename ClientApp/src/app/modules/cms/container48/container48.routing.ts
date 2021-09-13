import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container48Component } from './container48';

const routes: Routes = [
  { path: '', component: Container48Component },
  { path: 'edit/:id', component: Container48Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container48RoutingModule  { }

export const Container48RoutingComponent = [Container48Component ]
