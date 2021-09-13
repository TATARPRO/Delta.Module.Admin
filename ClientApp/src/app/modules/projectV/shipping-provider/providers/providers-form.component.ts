import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { ShippingProviderEndpoints } from '../shipProviderEndpoints';
import { ShippingProviderFormVm } from '../shipProviderModels';


class ProviderFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      phoneNumber: new CustomFormControl("Phone Number", "phoneNumber", "", "text", "tel", null),
      email: new CustomFormControl("Email", "email", "", "text", "an", Validators.compose([
        Validators.required])),
      address: new CustomFormControl("Address", "address", "", "text", "a", null),
      isEnabled: new CustomFormControl("Is Enabled", "isEnabled", "", "checkbox"),
    })
  }
}

@Component({
  selector: 'providers-form-component',
  templateUrl: './providers-form.component.html'
})
export class ProviderFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: ShippingProviderFormVm = new ShippingProviderFormVm();
  public providerFormGroup: ProviderFormGroup = new ProviderFormGroup();
  public title: string = "Shipping Providers";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: ShippingProviderEndpoints) {
    super('providers-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.inAsyncMode = true
      this.getShippingProvider(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.providerFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      
      if (!this.isEditMode)
        result = this.createProvider()
      else 
        result = this.updateProvider()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/shipping-providers")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }


  private createProvider() {
    return this.httpContext.create<any>(this.endpoints.shippingProviders.create, this.model)
  }

  private updateProvider() {
    return this.httpContext.update<any>(this.endpoints.shippingProviders.update + this.model.id, this.model)
  }

  private getShippingProvider(id: number) {
    this.httpContext.read<any>(this.endpoints.shippingProviders.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
