import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { User } from '../../../../core/core-interface';
import { VendorForm } from '../vendor-models';
import { VendorEndpoints } from '../vendor-endpoints';


class VendorFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      deltaUserId: new CustomFormControl("User", "deltaUserId", "", "select", "a", Validators.compose([
        Validators.required])),
      verificationMethod: new CustomFormControl("Verification Method", "verificationMethod", "", "select", "a", Validators.compose([
        Validators.required])),
      description: new CustomFormControl("Description", "description", "", "textarea", "a", null),
      companyName: new CustomFormControl("Company Name", "companyName", "", "text", "a", Validators.compose([
        Validators.required])),
      contactEmail: new CustomFormControl("Contact Email", "contactEmail", "", "text", "a", null),
      contactPhone: new CustomFormControl("Contact Phone", "contactPhone", "", "text", "a", Validators.compose([
        Validators.required])),
      contactAddress: new CustomFormControl("Contact Address", "contactAddress", "", "text", "a", Validators.compose([
        Validators.required])),
      isActive: new CustomFormControl("Is Active", "isActive", "", "checkbox"),
      isVerified: new CustomFormControl("Is Verified", "isVerified", "", "checkbox")
    })
  }
}

@Component({
  selector: 'vendor-form-component',
  templateUrl: './vendor-form.component.html'
})
export class VendorFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: VendorForm = new VendorForm();
  public vendorFormGroup: VendorFormGroup = new VendorFormGroup();
  public title: string = "Vendors";
  public isEditMode = false;
  public isSubmitting = false;
  private form = new FormData();
  public passportPreview: any
  public verificationPreview: any;
  public users: User[] = new Array<User>();
  public verificationMethods = [{ id: 0, name: ""}]
 
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private endpoints: EndpointMetadata, private vendpoints: VendorEndpoints) {
    super('vendor-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    this.getUsers()
    this.getVerificationMethods();
    if (this.model && this.model.id) {
      this.getVendor(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.vendorFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      this.createFormData();

      if (!this.isEditMode)
        result = this.createVendor()
      else 
        result = this.updateVendor()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/vendor/vendors")
      }, (fail) => {
          this.handleError(fail)
          this.inAsyncMode = false
      });
    }
  }

  private createFormData() {
    this.form = new FormData();
    for (let key in this.model) {
      if (this.model[key] instanceof Object) {
        for (let innerKey in this.model[key]) {
          if (this.model[key][innerKey] != undefined) {
            if (this.model[key][innerKey] instanceof File) {
              this.form.append(`${key}[${innerKey}]`, this.model[key][innerKey], innerKey)
            } else {
              this.form.append(`${key}[${innerKey}]`, this.model[key][innerKey])
            }
          }
        }
      } else {
        if (this.model[key] != undefined) {
          this.form.append(key, this.model[key])
        }
      }
    }
  }

  public setPhoto(fileList: FileList) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.model.vendorData.passportPhotograph = file
      this.getPassportPreview(file);
    }
  }

  public getPassportPreview(file: File) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.passportPreview = reader.result }
  }

  public setDocument(fileList: FileList) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.model.vendorData.verificationData = file
      this.getVerificationPreview(file)
    }
  }

  public getVerificationPreview(file: File) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.verificationPreview = reader.result }
  }

  private createVendor() {
    return this.httpContext.create<any>(this.vendpoints.vendorEndpoints.create, this.form)
  }

  private updateVendor() {
    return this.httpContext.update<any>(this.vendpoints.vendorEndpoints.update, this.form)
  }

  private getVendor(id: number) {
    this.httpContext.read<any>(this.vendpoints.vendorEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }

  private getVerificationMethods() {
    this.httpContext.read<any>(this.vendpoints.vendorEndpoints.verification).subscribe((x) => {
      this.verificationMethods = x
    }, (fail) => {
      this.handleError(fail)
    });
  }

  private getUsers() {
    this.httpContext.search<any>(this.endpoints.userEndpoints.list, this.smartTableParam).subscribe((x) => {
      this.users = x.items
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }
}
