import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Container2Component } from './container2';

const routes: Routes = [
  { path: '', component: Container2Component },
  { path: 'edit/:id', component: Container2Component }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Container2RoutingModule  { }

export const Container2RoutingComponent = [Container2Component ]
