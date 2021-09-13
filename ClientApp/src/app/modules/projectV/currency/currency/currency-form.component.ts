import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { CurrencyForm } from '../currency.models';
import { CurrencyEndpoints } from '../currencyEndpoints';
import { Country } from '../../core/corev-models';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { SmartTableParam } from '../../../../core/core-interface';



class CurrencyFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      id: new CustomFormControl("Id", "id", "", "text", "an", Validators.compose([
        Validators.required])),
      countryId: new CustomFormControl("Country", "countryId", "", "select", "a", Validators.compose([
        Validators.required])),
      currencyCode: new CustomFormControl("Currency Code", "currencyCode", "", "text", "a", null),
      currencyCulture: new CustomFormControl("Currency Culture", "currencyCulture", "", "text", "a", null),
      exchangeRateToDollar: new CustomFormControl("Exchange Rate To Dollar", "exchangeRateToDollar", "", "number", "an", null)
    })
  }
}

@Component({
  selector: 'currency-component',
  templateUrl: './currency-form.component.html'
})
export class CurrencyFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: CurrencyForm = new CurrencyForm();
  public currencyFormGroup: CurrencyFormGroup = new CurrencyFormGroup();
  public countries: Country[] = new Array<Country>();
  public title: string = "Currency";
  public isEditMode = false;
  public isSubmitting = false;
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private currencyEndpoints: CurrencyEndpoints,
    private coreEndpoints: CoreVEndpoints) {
    super('currency-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    this.getCountries();
    if (this.model && this.model.id) {
      this.getCurrency(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.currencyFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      
      if (!this.isEditMode)
        result = this.createCurrency()
      else 
        result = this.updateCurrency()
      
      result.subscribe(() => {
        this.router.navigateByUrl("/module/projectv/currency/currency")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createCurrency() {
    return this.httpContext.create<any>(this.currencyEndpoints.currency.create, this.model)
  }

  private updateCurrency() {
    return this.httpContext.update<any>(this.currencyEndpoints.currency.update + this.model.id, this.model)
  }

  private getCurrency(id: number) {
    this.inAsyncMode = true
    this.httpContext.read<any>(this.currencyEndpoints.currency.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }

  private getCountries() {
    this.httpContext.read<any>(this.coreEndpoints.countryEndpoints.list).subscribe((x) => {
      this.countries = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail)
    });
  }
}
