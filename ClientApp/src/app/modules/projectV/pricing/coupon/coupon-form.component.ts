import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { CouponForm } from '../pricing.models';
import { PricingEndpoints } from '../pricingEndpoints';


class CouponFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      description: new CustomFormControl("Description", "description", "", "text", "a", null),
      startOn: new CustomFormControl("Select a start date", "startOn", "", "date", "a", null),
      endOn: new CustomFormControl("Select an end date", "endOn", "", "date", "an", null),
      couponCode: new CustomFormControl("Coupon Code", "couponCode", "", "text", "a", null),
      ruleToApply: new CustomFormControl("Rule To Apply", "ruleToApply", "", "text", "a", Validators.compose([
        Validators.required])),
      discountAmount: new CustomFormControl("Discount Amount", "discountAmount", "", "number", "a", Validators.compose([
        Validators.required])),
      maxDiscountAmount: new CustomFormControl("Max Discount Amount", "maxDiscountAmount", "", "number", "a", null),
      discountStep: new CustomFormControl("Discount Step", "discountStep", "", "number", "a", null),
      usageLimitPerCoupon: new CustomFormControl("Usage Limit Per Coupon", "usageLimitPerCoupon", "", "number", "a", null),
      usageLimitPerCustomer: new CustomFormControl("Usage Limit Per Customer", "usageLimitPerCustomer", "", "number", "a", null),
      isActive: new CustomFormControl("Is Active", "isActive", "", "checkbox", "a", null),
      isCouponRequired: new CustomFormControl("Is Coupon Required?", "isCouponRequired", "", "checkbox", "a", null)
    })
  }
}

@Component({
  selector: 'coupon-form-component',
  templateUrl: './coupon-form.component.html'
})
export class CouponFormComponent extends ComponentBase implements AfterViewInit, OnInit {


  public model: CouponForm = new CouponForm();
  public couponFormGroup: CouponFormGroup = new CouponFormGroup();
  public title: string = "Coupons";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: PricingEndpoints) {
    super('coupon-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.inAsyncMode = true
      this.getCoupons(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.couponFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      
      if (!this.isEditMode)
        result = this.createCoupon()
      else 
        result = this.updateCoupon()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/pricing/coupon")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createCoupon() {
    return this.httpContext.create<any>(this.endpoints.coupons.create, this.model)
  }

  private updateCoupon() {
    return this.httpContext.update<any>(this.endpoints.coupons.update + this.model.id, this.model)
  }

  public setSelectedProducts(data: any) {
    let index = this.model.products.findIndex(x => x.id == data.product.id)
    if (index < 0) {
      this.model.products.push(data.product)
    }
  }

  public removeSelectedProducts(data: any) {
    let index = this.model.products.findIndex(x => x.id == data.productId)
    if (index > -1) {
      this.model.products.splice(index, 1)
    }
  }

  private getCoupons(id: number) {
    this.httpContext.read<any>(this.endpoints.coupons.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
