import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./country/country.module').then(x => x.CountryModule) },
  { path: 'countries', loadChildren: () => import('./country/country.module').then(x => x.CountryModule) },
  { path: 'districts', loadChildren: () => import('./district/district.module').then(x => x.DistrictsModule) },
  { path: 'states', loadChildren: () => import('./state-province/state.module').then(x => x.StatesModule) }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class CoreVRoutingModule { }

export const CoreVRoutingComponent = []

