import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { StateOrProvinceForm, Country } from '../corev-models';
import { CoreVEndpoints } from '../corev-endpoints';


class StateProvinceFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      code: new CustomFormControl("Code", "code", "", "text", "a", Validators.compose([
        Validators.required])),
      countryId: new CustomFormControl("Country", "countryId", "", "select", "a", Validators.compose([
        Validators.required]))
    })
  }
}

@Component({
  selector: 'state-form-component',
  templateUrl: './state-form.component.html'
})
export class StateProvinceFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: StateOrProvinceForm = new StateOrProvinceForm();
  public stateProvinceFormGroup: StateProvinceFormGroup = new StateProvinceFormGroup();
  public title: string = "State or Provinces";
  public isEditMode = false;
  public isSubmitting = false;
  public countries: Country[] = new Array <Country>();
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: CoreVEndpoints) {
    super('state-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    if (this.model && this.model.id) {
      this.getState(this.model.id)
    }
    this.getCountries();
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.stateProvinceFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createState()
      else 
        result = this.updateState()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/core/states")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createState() {
    return this.httpContext.create<any>(this.endpoints.statesEndpoints.create, this.model)
  }

  private updateState() {
    return this.httpContext.update<any>(this.endpoints.statesEndpoints.update + this.model.id, this.model)
  }

  private getState(id: number) {
    this.httpContext.read<any>(this.endpoints.statesEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }

  private getCountries() {
    this.httpContext.read<Country[]>(this.endpoints.countryEndpoints.list).subscribe((x) => {
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
