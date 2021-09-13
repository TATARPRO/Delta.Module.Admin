import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { ExchangeRateForm } from '../currency.models';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { Country } from '../../core/corev-models';
import { CurrencyEndpoints } from '../currencyEndpoints';


class ExchangeRateFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      countryAId: new CustomFormControl("Country A", "countryAId", "", "select", "a", Validators.compose([
        Validators.required])),
      currencyAValue: new CustomFormControl("Currency A Value", "currencyAValue", "", "number", "a", Validators.compose([
        Validators.required])),
      countryBId: new CustomFormControl("Country B", "countryBId", "", "select", "a", Validators.compose([
        Validators.required])),
      currencyBValue: new CustomFormControl("Currency B Value", "currencyBValue", "", "number", "a", Validators.compose([
        Validators.required])),
    })
  }
}

@Component({
  selector: 'exchangerate-component',
  templateUrl: './exchange-form.component.html'
})
export class ExchangeRateFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: ExchangeRateForm = new ExchangeRateForm();
  public exchangeRateFormGroup: ExchangeRateFormGroup = new ExchangeRateFormGroup();
  public title: string = "Exchange Rates";
  public countries: Country[] = new Array<Country>();
  public isEditMode = false;
  public isSubmitting = false;
  

  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private coreEndpoints: CoreVEndpoints, private currencyEndpoints: CurrencyEndpoints) {
    super('exchangerate-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    this.getCountries();
    if (this.model && this.model.id) {
      this.getExchangeRate(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.exchangeRateFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createExchangeRate()
      else 
        result = this.updateExchangeRate()
      
      result.subscribe(() => {
        this.router.navigateByUrl("/module/projectv/currency/exchange-rate")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createExchangeRate() {
    return this.httpContext.create<any>(this.currencyEndpoints.exchangeRate.create, this.model)
  }

  private updateExchangeRate() {
    return this.httpContext.update<any>(this.currencyEndpoints.exchangeRate.update, this.model)
  }

  private getCountries() {
    this.httpContext.read<any>(this.coreEndpoints.countryEndpoints.list).subscribe((x) => {
      this.countries = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  private getExchangeRate(id: number) {
    this.inAsyncMode = true
    this.httpContext.read<any>(this.currencyEndpoints.exchangeRate.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
