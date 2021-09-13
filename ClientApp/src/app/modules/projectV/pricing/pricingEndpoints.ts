import { Injectable } from '@angular/core'

@Injectable()
export class PricingEndpoints {
  coupons = {
    list: "/projectv/coupon-rule/list",
    search: "/projectv/coupon-rule/search",
    delete: "/projectv/coupon-rule/delete/",
    read: "/projectv/coupon-rule/read/",
    update: "/projectv/coupon-rule/update/",
    create: "/projectv/coupon-rule/create/",
    download: "/projectv/coupon-rule/export/"
  }

  couponUsage = {
    search: "/projectv/coupon-usage/search",
    download: "/projectv/coupon-usage/download"
  }
}
