import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { VendorEndpoints } from '../vendor-endpoints';
import { PartisanVendorList } from '../vendor-models';


@Component({
  selector: 'partisan-vendor-component',
  templateUrl: './partisan-list.component.html'
})
export class PartisanVendorsComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "Partisan Vendors";
  public vendors = new Array<PartisanVendorList>(); 

  public constructor(private endpoints: VendorEndpoints) {
    super('partisan-vendor-component')
    
  }

  ngOnInit() {
    this.getVendors();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getVendors() {
    this.httpContext.read<any>(this.endpoints.partisanEndpoints.list).subscribe((x) => {
      this.vendors = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }
}
