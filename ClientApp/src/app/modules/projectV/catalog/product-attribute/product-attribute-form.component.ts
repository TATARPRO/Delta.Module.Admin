import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { ProductAttributeFormVm, ProductAttributeVm} from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';



class ProductAttributeFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      groupId: new CustomFormControl("Group", "groupId", "", "select", "a", Validators.compose([
        Validators.required])),
    })
  }
}

@Component({
  selector: 'prattribute-form-component',
  templateUrl: './product-attribute-form.component.html'
})
export class ProductAttributeFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: ProductAttributeFormVm = new ProductAttributeFormVm();
  public attribFormGroup: ProductAttributeFormGroup = new ProductAttributeFormGroup();
  public title: string = "Product Attributes";
  public isEditMode = false;
  public isSubmitting = false;
  public attrGroups: ProductAttributeVm[] = new Array<ProductAttributeVm>();
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: CatalogEndpoints) {
    super('prattribute-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.inAsyncMode = true
      this.getProductAttribute(this.model.id)
    }
    this.getAttributeGroups()
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.attribFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createProductAttribute()
      else 
        result = this.updateProductAttribute()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/catalog/prattributes")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createProductAttribute() {
    return this.httpContext.create<any>(this.endpoints.productAttributeEndpoints.create, this.model)
  }

  private updateProductAttribute() {
    return this.httpContext.update<any>(this.endpoints.productAttributeEndpoints.update + this.model.id, this.model)
  }

  private getProductAttribute(id: number) {
    this.httpContext.read<any>(this.endpoints.productAttributeEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }

  private getAttributeGroups() {
    this.httpContext.read<any>(this.endpoints.productAttributeGroupEndpoints.list).subscribe((x) => {
      this.attrGroups = x
    }, (fail) => { this.handleError(fail) });
  }
}
