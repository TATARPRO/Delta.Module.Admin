import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { Container363Component } from './container363';

const routes: Routes = [
  { path: '', component: Container363Component },
  { path: 'edit/:id', component: Container363Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container363RoutingModule  { }

export const Container363RoutingComponent = [Container363Component ]
