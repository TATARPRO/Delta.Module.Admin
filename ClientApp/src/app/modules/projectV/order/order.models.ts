import { ProductLinkVm } from "../catalog/catalog-models";

export class OrderListVm {
  id: string;
  customerName: string;
  orderTotal: number;
  orderTotalString: string
  orderStatus: number
  dateCreated: string
}

export class AddressFormVm {
  contactName: NonNullable<string>
  phone: NonNullable<string>
  addressLine1: NonNullable<string>
  addressLine2
  stateOrProvinceId: NonNullable<number>
  districtId
  countryId: NonNullable<string>
  city
  zipCode
}

export class ShippingAddressVm {
  userAddressId
  contactName
  phone
  addressLine1
  districtId
  districtName
  zipCode
  stateOrProvinceId
  stateOrProvinceName
  cityName
  countryId
  countryName
  isCityEnabled
  isZipCodeEnabled
  isDistrictEnabled
}
export class AvailableShippingVm {
  providerId: number
  providerName: string
  shippingCostText: string
  showMinimumTotal: boolean
  minimumOrderTotal: string
  note: string
}

export class CheckoutProduct {
  id: number
  productId: number
  name: string
  slug: string
  thumbnailUrl: string
  quantity: number = 1
  price: string
  priceString: string
  total: number
  totalString: string
  shippingPrice
  shippingPriceString
  isAvailableToOrder
  productStockTrackingIsEnabled
  productStockQuantity
}

export class CheckoutOrderDetail {
  orderId: string;
  mOrderId: string
  orderStatus: number
  customerId: string;
  checkoutProducts: CheckoutProduct[] = new Array<CheckoutProduct>();
  shippingAddress: ShippingAddressVm
  billingAddress: ShippingAddressVm
  selectedShippingAddressId: number = 0
  selectedBillingAddressId: number = 0
  isValid: boolean;
  useShippingAddressAsBillingAddress: boolean = true
  existingShippingAddresses: ShippingAddressVm
  existingBillingAddresses: ShippingAddressVm
  taxAmount: number
  taxAmountString: string
  orderNote: string
  couponCode: string
  subTotal: number
  subTotalString: string
  orderTotal: number
  orderTotalString: string
  shippingTotal: number
  shippingTotalString: string
  selectedShippingProviderId: number = 0
  errors: string[]
  shippingProviders: AvailableShippingVm[] = new Array<AvailableShippingVm>()
}

export class OrderCreatedResult {
  oid: string
  succeeded: boolean
  sta: number
}
