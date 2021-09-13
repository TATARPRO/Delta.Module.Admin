import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container84Component } from './container84';

const routes: Routes = [
  { path: '', component: Container84Component },
  { path: 'edit/:id', component: Container84Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container84RoutingModule  { }

export const Container84RoutingComponent = [ Container84Component ]
