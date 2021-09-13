import { ProductLinkVm } from "../catalog/catalog-models";

export class CouponListVm {
  id: number;
  name: string;
  startOn: string;
  endOn: string;
  isActive: boolean;
}

export class CouponForm {
  id: number;
  name: string;
  description: string;
  startOn: Date
  endOn: Date
  couponCode: string
  ruleToApply: string
  discountAmount: number
  maxDiscountAmount: number
  discountStep: number
  usageLimitPerCoupon: number
  usageLimitPerCustomer: number
  isActive: boolean;
  isCouponRequired: boolean
  products: ProductLinkVm[] = new Array<ProductLinkVm>()
}

export class CouponUsage {
  id: number;
  couponRuleId: string;
  cartRuleName: string;
  userId: string;
  fullName: string;
  couponCode: string;
  orderId: string;
  dateCreated: string;
  isActive: boolean;
}

