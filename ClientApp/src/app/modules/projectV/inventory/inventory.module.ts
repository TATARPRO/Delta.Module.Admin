import { NgModule } from '@angular/core';
import { StoresModule } from './store/store.module';
import { InventoryVRoutingComponent, InventoryVRoutingModule } from './inventory.routing';


@NgModule({
  declarations: [InventoryVRoutingComponent],
  imports: [InventoryVRoutingModule],
  providers: []
})
export class InventoryModule {
 
}
