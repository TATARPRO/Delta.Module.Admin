import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { BrandForm } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';


class BrandFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required])),
      slug: new CustomFormControl("Slug", "slug", "", "text", "a", Validators.compose([
        Validators.required])),
      description: new CustomFormControl("Description", "description", "", "textarea", "a", null),
      metaTitle: new CustomFormControl("Meta Title", "metaTitle", "", "text", "a", null),
      metaKeywords: new CustomFormControl("Meta Keywords", "metaKeywords", "", "text", "a", null),
      metaDescription: new CustomFormControl("Meta Description", "metaDescription", "", "text", "a", null),
      displayOrder: new CustomFormControl("DisplayOrder", "displayOrder", "", "text", "a", null),
      iconClass: new CustomFormControl("Icon Url", "iconClass", "", "text", "an", null),
      isPublished: new CustomFormControl("Is Published", "isPublished", "", "checkbox", "a", null)
    })
  }
}

@Component({
  selector: 'brand-form-component',
  templateUrl: './brand-form.component.html'
})
export class BrandFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: BrandForm = new BrandForm();
  public brandFormGroup: BrandFormGroup = new BrandFormGroup();
  public title: string = "Brands";
  public isEditMode = false;
  public isSubmitting = false;
  private form = new FormData();
  
  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: CatalogEndpoints) {
    super('brand-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.inAsyncMode = true
      this.getBrand(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.brandFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      this.createFormData();
      if (!this.isEditMode)
        result = this.createBrand()
      else 
        result = this.updateBrand()
      
      result.subscribe(() => {
        this.router.navigateByUrl("/module/projectv/catalog/brands")
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
      this.getFilePreview(file);
    }
  }

  public getFilePreview(file: File) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.model.thumbnailPreviewUrl = reader.result }
  }

  private createFormData() {
    for (let key in this.model) {
      if (this.model[key] != undefined) {
        let value = this.model[key];
        this.form.append(key, value)
      }
    }
  }

  private createBrand() {
    return this.httpContext.create<any>(this.endpoints.brandEndpoints.create, this.form)
  }

  private updateBrand() {
    return this.httpContext.update<any>(this.endpoints.brandEndpoints.update + this.model.id, this.form)
  }

  private getBrand(id: number) {
    this.httpContext.read<any>(this.endpoints.brandEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
