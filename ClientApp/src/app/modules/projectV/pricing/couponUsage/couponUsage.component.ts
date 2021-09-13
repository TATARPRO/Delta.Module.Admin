import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CouponUsage } from '../pricing.models';
import { PricingEndpoints } from '../pricingEndpoints';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'couponUsage',
  templateUrl: './couponUsage.component.html'
})
export class CouponUsageComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Coupon Usage";
  
  public constructor(private endpoints: PricingEndpoints,) {
    super('couponUsage')
    this.smartTableResult.items = new Array<CouponUsage>()
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getcouponUsages();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getcouponUsages() {
    this.httpContext.search<any>(this.endpoints.couponUsage.search, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x
      this.inAsyncMode = false
    });
  }

  public downloadCouponUsage() {
    
    this.httpContext.raw<Blob>("GET", this.endpoints.couponUsage.download, null, {
      reportProgress: true,
      responseType: 'blob'
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        
      } else if (x instanceof HttpResponse) {
        
        let downloadedFile = new Blob([x.body], { type: "text/csv; charset=utf-8" });

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = `acdte.coupon-usage.csv`;
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
}
