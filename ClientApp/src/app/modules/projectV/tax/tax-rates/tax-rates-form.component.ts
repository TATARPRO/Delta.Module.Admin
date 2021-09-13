import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { TaxRateForm } from '../tax.models';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { Country } from '../../core/corev-models';
import { TaxEndpoints } from '../taxEndpoints';

class TaxRateFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      taxClassId: new CustomFormControl("Tax Class", "taxClassId", "", "select", "a", Validators.compose([
        Validators.required])),
      countryId: new CustomFormControl("Country", "countryId", "", "select", "a", Validators.compose([
        Validators.required])),
      stateOrProvinceId: new CustomFormControl("State Or Province", "stateOrProvinceId", "", "select"),
      zipCode: new CustomFormControl("Zip Code", "zipCode", "", "text", "a", null),
      rate: new CustomFormControl("Rate in percentage", "rate", "", "number", "", Validators.compose([
        Validators.required])),
    })
  }
}

@Component({
  selector: 'taxrates-form-component',
  templateUrl: './tax-rates-form.component.html'
})
export class TaxRatesFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: TaxRateForm = new TaxRateForm();
  public taxRateFormGroup: TaxRateFormGroup = new TaxRateFormGroup();
  public title: string = "Tax Rates";
  public countries: Country[] = new Array<Country>();
  public states: [];
  public taxClasses: { id: number, name: string };
  public isEditMode = false;
  public isSubmitting = false;
  

  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private coreEndpoints: CoreVEndpoints, private taxEndpoints: TaxEndpoints) {
    super('taxrates-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    if (this.model && this.model.id) {
      this.getTaxRate(this.model.id)
    }
    this.getTaxClasses();
    this.getCountries();
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.taxRateFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createTaxRate()
      else 
        result = this.updateTaxRate()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/tax/tax-rates")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createTaxRate() {
    return this.httpContext.create<any>(this.taxEndpoints.taxRates.create, this.model)
  }
  s
  private updateTaxRate() {
    return this.httpContext.update<any>(this.taxEndpoints.taxRates.update + this.model.id, this.model)
  }

  private getCountries() {
    this.httpContext.read<any>(this.coreEndpoints.countryEndpoints.list).subscribe((x) => {
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
        this.states = []
      this.handleError(fail)
    });
  }

  private getTaxClasses() {
    this.httpContext.read<any>(this.taxEndpoints.taxClass.list).subscribe((x) => {
      this.taxClasses = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  private getTaxRate(id: number) {
    this.httpContext.read<any>(this.taxEndpoints.taxRates.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
