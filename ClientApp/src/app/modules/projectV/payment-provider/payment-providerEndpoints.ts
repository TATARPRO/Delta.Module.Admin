import { Injectable } from '@angular/core'

@Injectable()
export class PaymentProviderEndpoints {
  flutterwave = {
    read: "/projectv/flutterwave/read/",
    update: "/projectv/flutterwave/update/"
  }

  paymentProviders = {
    list: "/projectv/payment-providers/list/",
    enable: "/projectv/payment-providers/enable/",
    disable: "/projectv/payment-providers/disable/",
  }
}
