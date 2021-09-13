import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { Container12Component } from './container12';

const routes: Routes = [
  { path: '', component: Container12Component },
  { path: 'edit/:id', component: Container12Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container12RoutingModule  { }

export const Container12RoutingComponent = [Container12Component ]
