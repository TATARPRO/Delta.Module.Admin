import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container93Component } from './container93';

const routes: Routes = [
  { path: '', component: Container93Component },
  { path: 'edit/:id', component: Container93Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container93RoutingModule  { }

export const Container93RoutingComponent = [ Container93Component ]
