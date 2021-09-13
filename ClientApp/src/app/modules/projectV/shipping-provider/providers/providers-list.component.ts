import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { DialogOptions, NotificationType } from '../../../../core/core-interface';
import { ShippingProviderEndpoints } from '../shipProviderEndpoints';
import { ShippingProviderListVm } from '../shipProviderModels';


@Component({
  selector: 'providers-list-component',
  templateUrl: './providers-list.component.html'
})
export class ProviderListComponent extends ComponentBase implements AfterViewInit, OnInit {
  public shippingProviders: ShippingProviderListVm[] = new Array<ShippingProviderListVm>();
  public title: string = "Shipping Providers";
  
  public constructor(private endpoints: ShippingProviderEndpoints) {
    super('providers-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getShippingProviders();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getShippingProviders() {
    this.httpContext.read<any>(this.endpoints.shippingProviders.list).subscribe((x) => {
      this.shippingProviders = x
      this.inAsyncMode = false
    });
  }

  public enableOrDisable(id: number) {
    this.inAsyncMode = true
    this.httpContext.read<any>(this.endpoints.shippingProviders.enableOrDisable + id).subscribe((x) => {
      this.shippingProviders = x
      this.inAsyncMode = false
    });
  }

  public deleteProvider(id: number) {
    this.inAsyncMode = true
    this.showModalDialog("Delete Shipping Provider", "Are you sure you want to delete this shipping provider?",
      NotificationType.danger, DialogOptions.YesCancel).then(() => {
        this.httpContext.delete<any>(this.endpoints.shippingProviders.delete + id).subscribe(() => {
          this.getShippingProviders();
        }, (fail) => {
            this.inAsyncMode = false
          this.handleError(fail)
        });
      }).catch(() => {  })
  }
}
