import { Injectable } from '@angular/core'

@Injectable()
export class ShippingProviderEndpoints {
  shippingProviders = {
    read: "/projectv/shipping-providers/read/",
    update: "/projectv/shipping-providers/update/",
    create: "/projectv/shipping-providers/create/",
    list: "/projectv/shipping-providers/list/",
    delete: "/projectv/shipping-providers/delete/",
    enableOrDisable: "/projectv/shipping-providers/enable-disable/"
  }
}
