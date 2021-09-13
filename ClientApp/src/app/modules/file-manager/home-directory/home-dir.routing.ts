import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeDirectoryComponent } from './home-dir.component';

const routes: Routes = [
  { path: '', component: HomeDirectoryComponent },
  { path: 'home', component: HomeDirectoryComponent },
  { path: 'home/:id', component: HomeDirectoryComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDirectoryRoutingModule { }

export const HomeDirectoryRoutingComponent = [HomeDirectoryComponent ]
