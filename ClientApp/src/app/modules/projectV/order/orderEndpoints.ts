import { Injectable } from '@angular/core'

@Injectable()
export class OrderEndpoints {
  checked = {
    list: "/projectv/orders/list/",
    search: "/projectv/orders/search/",
    delete: "/projectv/orders/delete/",
    read: "/projectv/orders/read/",
    update: "/projectv/orders/update/",
    create: "/projectv/orders/create/",
    download: "/projectv/orders/download/",
  }

  checkout = {
    create: "/projectv/checkout/create-order/",
    checkoutDetails: "/projectv/checkout/checkout-details/",
    newShipping: "/projectv/checkout/new-shipping-address/",
    newBilling: "/projectv/checkout/new-billing-address/",
    shippingAddresses: "/projectv/checkout/shipping-addresses/",
    updateShipping: "/projectv/checkout/update-shipping-address/",
    updateBilling: "/projectv/checkout/update-billing-address/",
    shippingAsBilling: "/projectv/checkout/use-shipping-as-billing/",
    shippingCountries: "/projectv/checkout/shipping-enabled-countries/",
    shippingStates: "/projectv/checkout/shipping-states/",
    billingCountries: "/projectv/checkout/billing-enabled-countries/",
    changeShippingProvider: "/projectv/checkout/change-shipping-provider/",
    applyCoupon: "/projectv/checkout/apply-coupon/",
    saveNote: "/projectv/checkout/save-ordernote/",
    cancel: "/projectv/checkout/cancel-order/"
  }

  cart = {
    create: "/projectv/cart/create/",
    read: "/projectv/cart/read/",
    addItem: "/projectv/cart/",
    addItems: "/projectv/cart/",
    removeItem: "/projectv/cart/delete/item/",
    updateQuantity: "/projectv/cart/update/quantity",
  }
}
