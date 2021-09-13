import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { ProductOptionFormVm } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';



class ProductOptionFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required]))
    })
  }
}

@Component({
  selector: 'option-form-component',
  templateUrl: './product-option-form.component.html'
})
export class ProductOptionFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: ProductOptionFormVm = new ProductOptionFormVm();
  public optionFormGroup: ProductOptionFormGroup = new ProductOptionFormGroup();
  public title: string = "Product Options";
  public isEditMode = false;
  public isSubmitting = false;
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: CatalogEndpoints) {
    super('option-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.inAsyncMode = true
      this.getOption(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.optionFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createOption()
      else 
        result = this.updateOption()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/catalog/proptions")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createOption() {
    return this.httpContext.create<any>(this.endpoints.productOptionEndpoints.create, this.model)
  }

  private updateOption() {
    return this.httpContext.update<any>(this.endpoints.productOptionEndpoints.update + this.model.id, this.model)
  }

  private getOption(id: number) {
    this.httpContext.read<any>(this.endpoints.productOptionEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
