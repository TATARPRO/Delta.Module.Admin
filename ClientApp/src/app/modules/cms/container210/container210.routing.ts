import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { Container210Component } from './container210';

const routes: Routes = [
  { path: '', component: Container210Component },
  { path: 'edit/:id', component: Container210Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container210RoutingModule  { }

export const Container210RoutingComponent = [Container210Component ]
