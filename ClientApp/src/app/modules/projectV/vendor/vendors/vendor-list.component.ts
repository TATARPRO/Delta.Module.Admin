import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { SmartTableResult } from '../../../../core/core-interface';
import { Vendor } from '../vendor-models';
import { VendorEndpoints } from '../vendor-endpoints';



@Component({
  selector: 'vendor-list-component',
  templateUrl: './vendor-list.component.html'
})
export class VendorListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Vendors";
  public smartTableResult: SmartTableResult = new SmartTableResult();

  public constructor(private endpoints: VendorEndpoints) {
    super('vendor-list-component')
    this.smartTableResult.items = new Array<Vendor>();
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getVendors();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getVendors() {
    this.httpContext.search<any>(this.endpoints.vendorEndpoints.list, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  public deleteVendor(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.vendorEndpoints.delete + id).subscribe(() => {
      this.getVendors();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
