import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { PartisanVendorForm, Vendor } from '../vendor-models';
import { VendorEndpoints } from '../vendor-endpoints';


@Component({
  selector: 'partisan-vendor-component',
  templateUrl: './partisan-settings.component.html'
})
export class PartisanSettingComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: PartisanVendorForm = new PartisanVendorForm();
  public vendors: Vendor[] = new Array<Vendor>();
  public title: string = "Partisan Vendor Settings";
  public isEditMode = true;
  public isSubmitting = false;


  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: VendorEndpoints) {
    super('partisan-vendor-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    this.getVendors();
    if (this.model && this.model.id) {
      this.getSettings(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;

    this.inAsyncMode = true
    this.validationErrors = []

    this.httpContext.update<any>(this.endpoints.partisanEndpoints.update, this.model).subscribe(() => {
      this.router.navigateByUrl("/module/projectv/vendor/partisan-vendors")
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  private getVendors() {
    this.httpContext.search<any>(this.endpoints.vendorEndpoints.list, this.smartTableParam).subscribe((x) => {
      this.vendors = x.items
    }, () => {
    });
  }

  private getSettings(id: string) {
    this.httpContext.read<any>(this.endpoints.partisanEndpoints.read +`?id=${id}`).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
    }, (fail) => {
      this.handleError(fail)
        this.inAsyncMode = false
    });
  }
}
