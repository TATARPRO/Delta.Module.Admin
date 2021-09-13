import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { StoreVm } from '../inventory.models';
import { SmartTableResult } from '../../../../core/core-interface';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { Country } from '../../core/corev-models';



class StoreFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      slug: new CustomFormControl("Slug", "slug", "", "text", "a", Validators.compose([
        Validators.required])),
      contactName: new CustomFormControl("Contact Name", "contactName", "", "text"),
      phone: new CustomFormControl("Phone", "phone", "", "text", "a", Validators.compose([
        Validators.required])),
      description: new CustomFormControl("Description", "description", "", "textarea"),
      addressId: new CustomFormControl("Address", "addressId", "", "select"),
      addressLine1: new CustomFormControl("Address Line 1", "addressLine1", "", "text"),
      addressLine2: new CustomFormControl("Address Line 2", "addressLine2", "", "text"),
      city: new CustomFormControl("City", "city", "", "text"),
      zipCode: new CustomFormControl("zip Code", "zipCode", "", "number"),
      countryId: new CustomFormControl("Country", "countryId", "", "select", "", Validators.compose([
        Validators.required])),
      stateOrProvinceId: new CustomFormControl("State Or Province", "stateOrProvinceId", "", "select", "", Validators.compose([
        Validators.required])),
      district: new CustomFormControl("district", "district", "", "text")
    })
  }
}

@Component({
  selector: 'store-form-component',
  templateUrl: './store-form.component.html'
})
export class StoreFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: StoreVm = new StoreVm();
  public storeFormGroup: StoreFormGroup = new StoreFormGroup();
  public title: string = "Stores";
  public isEditMode = false;
  public isSubmitting = false;
  public countryResult: SmartTableResult = new SmartTableResult();
  public states: { id: number, name: string };
  public thumbnailPreviewUrl: any
  private apiEndpoints = {
    read: "/projectv/stores/read/",
    update: "/projectv/stores/update/",
    create: "/projectv/stores/create/"
  }
  private form = new FormData();

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private coreEndpoints: CoreVEndpoints) {
    super('store-form-component')
    this.countryResult.items = new Array<Country>();
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.getStore(this.model.id)
      this.inAsyncMode = true
    }
    this.getCountries()
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.storeFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      this.createFormData();

      if (!this.isEditMode)
        result = this.createStore()
      else 
        result = this.updateStore()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/inventory/stores")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  public fileChanged(fileList: FileList) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.model.thumbnailImage = file
      this.getFilePreview(file)
    }
  }

  public getFilePreview(file: File) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.thumbnailPreviewUrl = reader.result }
  }

  private createFormData() {
    for (let key in this.model) {
      if (this.model[key] != undefined) {
        let value = this.model[key];
        this.form.append(key, value)
      }
    }
  }

  private getCountries() {
    this.httpContext.read<any>(this.coreEndpoints.countryEndpoints.list).subscribe((x) => {
      this.countryResult = x
      if (!this.isEditMode) {
      this.inAsyncMode = false
      }
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public getStates($event) {
    let countryId: number = $event.target.value
    this.model.countryId = countryId;
    this.httpContext.read<any>(this.coreEndpoints.statesEndpoints.byCountry + countryId).subscribe((x) => {
      this.states = x
      this.inAsyncMode = false
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  private createStore() {
    return this.httpContext.create<any>(this.apiEndpoints.create, this.form)
  }

  private updateStore() {
    return this.httpContext.update<any>(this.apiEndpoints.update, this.form)
  }

  private getStore(id: number) {
    this.httpContext.read<any>(this.apiEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
