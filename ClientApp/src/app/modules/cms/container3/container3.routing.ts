import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container3Component } from './container3';

const routes: Routes = [
  { path: '', component: Container3Component },
  { path: 'edit/:id', component: Container3Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container3RoutingModule  { }

export const Container3RoutingComponent = [Container3Component ]
