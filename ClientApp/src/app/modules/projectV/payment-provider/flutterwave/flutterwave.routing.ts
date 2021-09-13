import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlutterwaveFormComponent } from './flutterwave-form.component';

const routes: Routes = [
  { path: '', component: FlutterwaveFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlutterwaveRoutingModule { }

export const FlutterwaveRoutingComponent = [FlutterwaveFormComponent ]
