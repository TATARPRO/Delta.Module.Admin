import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CouponListVm } from '../pricing.models';
import { PricingEndpoints } from '../pricingEndpoints';


@Component({
  selector: 'cpl-component',
  templateUrl: './coupon-list.component.html'
})
export class CouponListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Coupons";
  
  public constructor(private endpoints: PricingEndpoints) {
    super('cpl-component')
    this.smartTableResult.items = new Array<CouponListVm>();
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getCoupons();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getCoupons() {
    this.httpContext.search<any>(this.endpoints.coupons.search, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x
      this.inAsyncMode = false
    });
  }

  public downloadCoupons() {
    this.inAsyncMode = true
    this.httpContext.raw<Blob>("GET", this.endpoints.coupons.download, null, {
      reportProgress: true,
      responseType: 'blob'
    }).subscribe((x) => {
        if (x instanceof HttpResponse) {
        
          this.inAsyncMode = false
        let downloadedFile = new Blob([x.body], { type: "text/csv; charset=utf-8" });

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = `acdte.coupons.csv`;
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      }
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public deleteCoupon(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.coupons.delete + id).subscribe(() => {
      this.getCoupons();
    }, (fail) => {
        this.handleError(fail)
        this.inAsyncMode = false
    });
  }
}
