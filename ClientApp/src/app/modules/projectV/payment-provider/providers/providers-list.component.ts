import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { PaymentProviderList } from '../payment-provider.models';
import { PaymentProviderEndpoints } from '../payment-providerEndpoints';


@Component({
  selector: 'providers-component',
  templateUrl: './providers-list.component.html'
})
export class ProviderListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Payment Providers";
  public paymentProviders: PaymentProviderList[] = new Array<PaymentProviderList>();
  
  public constructor(private endpoints: PaymentProviderEndpoints) {
    super('providers-component')
  }

  ngOnInit() {
    this.getPaymentProviders();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getPaymentProviders() {
    this.httpContext.read<any>(this.endpoints.paymentProviders.list).subscribe((x) => {
      this.paymentProviders = x
      this.inAsyncMode = false
    }, () => {});
  }

  public enableProvider(id: string) {
    this.httpContext.read<any>(this.endpoints.paymentProviders.enable + id).subscribe((x) => {
      this.inAsyncMode = true
      this.getPaymentProviders()
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail);
    });
  }

  public disableProvider(id: string) {
      this.inAsyncMode = true
    this.httpContext.read<any>(this.endpoints.paymentProviders.disable + id).subscribe((x) => {
      this.getPaymentProviders()
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail);
    });
  }
}
