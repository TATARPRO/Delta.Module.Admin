import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { Country } from '../corev-models';
import { CoreVEndpoints } from '../corev-endpoints';



class CountryFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      code3: new CustomFormControl("Three Letter ISO Code", "code3", "", "text", "a", Validators.compose([
        Validators.required, Validators.maxLength(3), Validators.minLength(3)])),
      isShippingEnabled: new CustomFormControl("Is Shipping Enabled", "isShippingEnabled", "", "checkbox", "an", null),
      isBillingEnabled: new CustomFormControl("Is Billing Enabled", "isBillingEnabled", "", "checkbox", "", null),
      isCityEnabled: new CustomFormControl("Is City Enabled", "isCityEnabled", "", "checkbox", "", null),
      isZipCodeEnabled: new CustomFormControl("Is Zip Code Enabled", "isZipCodeEnabled", "", "checkbox", "", null),
      isDistrictEnabled: new CustomFormControl("Is District Enabled", "isDistrictEnabled", "", "checkbox", "", null)
    })
  }
}

@Component({
  selector: 'country-form-component',
  templateUrl: './country-form.component.html'
})
export class CountryFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: Country = new Country();
  public countryFormGroup: CountryFormGroup = new CountryFormGroup();
  public title: string = "Countries";
  public isEditMode = false;
  public isSubmitting = false;
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: CoreVEndpoints) {
    super('country-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.getCountry(this.model.id)
      this.inAsyncMode = true
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.countryFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode) 
        result = this.createCountry()
      else 
        result = this.updateCountry()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/core/countries")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createCountry() {
    return this.httpContext.create<any>(this.endpoints.countryEndpoints.create, this.model)
  }

  private updateCountry() {
    return this.httpContext.update<any>(this.endpoints.countryEndpoints.update + this.model.id, this.model)
  }

  private getCountry(id: string) {
    this.httpContext.read<any>(this.endpoints.countryEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
