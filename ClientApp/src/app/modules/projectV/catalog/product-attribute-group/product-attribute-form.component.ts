import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { ProductAttributeGroupFormVm } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';



class ProductAttributeFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required]))
    })
  }
}

@Component({
  selector: 'attributegr-form-component',
  templateUrl: './product-attribute-form.component.html'
})
export class ProductAttributeGroupFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: ProductAttributeGroupFormVm = new ProductAttributeGroupFormVm();
  public atrrFormGroup: ProductAttributeFormGroup = new ProductAttributeFormGroup();
  public title: string = "Product Attribute Groups";
  public isEditMode = false;
  public isSubmitting = false;
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: CatalogEndpoints) {
    super('attributegr-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.getAttributeGroup(this.model.id)
      this.isEditMode = true
      this.inAsyncMode = true
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.atrrFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createAttributeGroup()
      else 
        result = this.updateAttributeGroup()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/catalog/prattributegrs")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createAttributeGroup() {
    return this.httpContext.create<any>(this.endpoints.productAttributeGroupEndpoints.create, this.model)
  }

  private updateAttributeGroup() {
    return this.httpContext.update<any>(this.endpoints.productAttributeGroupEndpoints.update + this.model.id, this.model)
  }

  private getAttributeGroup(id: number) {
    this.httpContext.read<any>(this.endpoints.productAttributeGroupEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
