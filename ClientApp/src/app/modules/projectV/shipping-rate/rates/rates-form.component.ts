import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { TaxEndpoints } from '../../tax/taxEndpoints';
import { Country, StateProvince } from '../../core/corev-models';
import { TaxClassListVm } from '../../tax/tax.models';
import { ShippingProviderEndpoints } from '../../shipping-provider/shipProviderEndpoints';
import { ShippingProviderListVm } from '../../shipping-provider/shipProviderModels';

class ShippingRateFormVm {
  id: number;
  name: string;
  countryId: string;
  shippingProviderId: number;
  taxClassId: number;
  stateOrProvinceId: number;
  note: string;
  minOrderSubtotal: number;
  shippingPrice: number;
}

class RateFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      shippingProviderId: new CustomFormControl("Shipping Provider", "shippingProviderId", "", "select", "a", Validators.compose([
        Validators.required])),
      countryId: new CustomFormControl("Country", "countryId", "", "select", "a", null),
      taxClassId: new CustomFormControl("Tax Class", "taxClassId", "", "select", "a", Validators.compose([
        Validators.required])),
      stateOrProvinceId: new CustomFormControl("State Or Province", "stateOrProvinceId", "", "select", "a", null),
      note: new CustomFormControl("Note", "note", "", "text", "a", null),
      shippingPrice: new CustomFormControl("Shipping Price", "shippingPrice", "", "number", "a", Validators.compose([
        Validators.required])),
      minOrderSubtotal: new CustomFormControl("Min Order Subtotal", "minOrderSubtotal", "", "number", "a", null)
    })
  }
}

@Component({
  selector: 'rates-form-component',
  templateUrl: './rates-form.component.html'
})
export class RateFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: ShippingRateFormVm = new ShippingRateFormVm();
  public rateFormGroup: RateFormGroup = new RateFormGroup();
  public title: string = "Shipping Rates";
  public isEditMode = false;
  public isSubmitting = false;
  public countries: Country[] = new Array<Country>();
  public states: StateProvince[] = new Array<StateProvince>();
  public taxClasses: TaxClassListVm[] = new Array<TaxClassListVm>();
  public shippingProviders: ShippingProviderListVm[] = new Array<ShippingProviderListVm>();
  private apiEndpoints = {
    read: "/projectv/shipping-rates/read/",
    update: "/projectv/shipping-rates/update/",
    create: "/projectv/shipping-rates/create/"
  }
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private coreEndpoints: CoreVEndpoints,
    private taxEndpoints: TaxEndpoints, private shippingEndpoints: ShippingProviderEndpoints) {
    super('rates-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    if (this.model && this.model.id) {
      this.getRate(this.model.id)
    }
    this.getCountries()
    this.getTaxClasses()
    this.getShippingProviders()
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.rateFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      
      if (!this.isEditMode)
        result = this.createRate()
      else 
        result = this.updateRate()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/shipping-rates")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createRate() {
    return this.httpContext.create<any>(this.apiEndpoints.create, this.model)
  }

  private updateRate() {
    return this.httpContext.update<any>(this.apiEndpoints.update + this.model.id, this.model)
  }

  private getTaxClasses() {
    this.httpContext.read<any>(this.taxEndpoints.taxClass.active).subscribe((x) => {
      this.taxClasses = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, x => {
        this.inAsyncMode = false
        this.handleError(x)
    });
  }

  private getShippingProviders() {
    this.httpContext.read<any>(this.shippingEndpoints.shippingProviders.list).subscribe((x) => {
      this.shippingProviders = x
    }, x => {
      this.inAsyncMode = false
      this.handleError(x)
    });
  }

  private getCountries() {
    this.httpContext.read<any>(this.coreEndpoints.countryEndpoints.shippingEnabled).subscribe((x) => {
      this.countries = x
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public getStates($event) {
    let countryId: string = $event.target.value
    this.model.countryId = countryId;
    this.httpContext.read<any>(this.coreEndpoints.statesEndpoints.byCountry + countryId).subscribe((x) => {
      this.states = x
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  private getRate(id: number) {
    this.httpContext.read<any>(this.apiEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
