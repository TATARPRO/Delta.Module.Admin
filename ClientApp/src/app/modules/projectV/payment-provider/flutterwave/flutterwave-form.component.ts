import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { FlutteraveConfigForm } from '../payment-provider.models';
import { PaymentProviderEndpoints } from '../payment-providerEndpoints';


@Component({
  selector: 'flutterwave-component',
  templateUrl: './flutterwave-form.component.html'
})
export class FlutterwaveFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: FlutteraveConfigForm = new FlutteraveConfigForm();
  public title: string = "Flutterwave configuration";
  
  public constructor(private router: Router, private endpoints: PaymentProviderEndpoints) {
    super('flutterwave-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getConfiguration()
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.inAsyncMode = true
    this.validationErrors = []
    this.updateConfiguration()
  }

  private updateConfiguration() {
    this.httpContext.update<any>(this.endpoints.flutterwave.update, this.model).subscribe(() => {
      this.router.navigateByUrl("/module/projectv/payment-providers")
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  private getConfiguration() {
    this.httpContext.read<any>(this.endpoints.flutterwave.read).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
