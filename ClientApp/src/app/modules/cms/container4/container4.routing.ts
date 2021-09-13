import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container4Component } from './container4';

const routes: Routes = [
  { path: '', component: Container4Component },
  { path: 'edit/:id', component: Container4Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container4RoutingModule  { }

export const Container4RoutingComponent = [Container4Component ]
