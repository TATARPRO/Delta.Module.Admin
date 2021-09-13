import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container102Component } from './container102';

const routes: Routes = [
  { path: '', component: Container102Component },
  { path: 'edit/:id', component: Container102Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container102RoutingModule  { }

export const Container102RoutingComponent = [Container102Component ]
