import { Injectable } from '@angular/core'

@Injectable()
export class ShippingProviderFormVm {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  isEnabled: boolean;
}

export class ShippingProviderListVm {
  id: number;
  name: string;
  isEnabled: boolean;
  email: string;
  phoneNumber: string;
  toAllShippingEnabledCountries: boolean;
}
