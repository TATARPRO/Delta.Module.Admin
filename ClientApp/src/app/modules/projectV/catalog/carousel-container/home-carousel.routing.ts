import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HomeCarouselComponent } from './home-carousel';

const routes: Routes = [
  { path: '', component: HomeCarouselComponent },
  { path: 'edit/:id', component: HomeCarouselComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeCarouselRoutingModule  { }

export const HomeCarouselRoutingComponent = [HomeCarouselComponent ]
