import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { Category, CategoryForm } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';

class CategoryFormGroup extends CustomFormGroup  {
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
      displayOrder: new CustomFormControl("Display Order", "displayOrder", "", "text", "a", null),
      iconClass: new CustomFormControl("Icon Url", "iconClass", "", "text", "an", null),
      includeInSearch: new CustomFormControl("Include In Search", "includeInSearch", "", "checkbox", "", null),
      isPublished: new CustomFormControl("Is Published", "isPublished", "", "checkbox", "", null)
    })
  }
}

@Component({
  selector: 'category-form-component',
  templateUrl: './category-form.component.html'
})
export class CategoryFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: CategoryForm = new CategoryForm();
  public categoryFormGroup: CategoryFormGroup = new CategoryFormGroup();
  public title: string = "Categories";
  public isEditMode = false;
  public isSubmitting = false;
  
  public categories: Category[] = new Array<Category>();
  private form = new FormData();

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: CatalogEndpoints) {
    super('category-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
      this.inAsyncMode = true
    if (this.model && this.model.id) {
      this.getCategory(this.model.id)
    }
    this.getCategories()
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.categoryFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      this.createFormData();
      if (!this.isEditMode)
        result = this.createCategory()
      else 
        result = this.updateCategory()
      
      result.subscribe(() => {
      this.router.navigateByUrl("/module/projectv/catalog/categories")
      }, (fail) => {
          this.handleError(fail)
          this.inAsyncMode = false
      });
    }
  }

  public fileChanged(fileList: FileList) {
    if (fileList.length > 0) {
      this.model.thumbnailImage = fileList[0]
      this.getFilePreview(fileList[0]);
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

  private createCategory() {
    return this.httpContext.create<any>(this.endpoints.categoryEndpoints.create, this.form)
  }

  private updateCategory() {
    return this.httpContext.update<any>(this.endpoints.categoryEndpoints.update + this.model.id, this.form)
  }

  private getCategory(id: number) {
    this.httpContext.read<any>(this.endpoints.categoryEndpoints.read + id).subscribe((x) => {
      this.model = x
      if (this.isEditMode) {
        let indexOfMe = (this.categories.indexOf(x.id))
        this.categories.splice(indexOfMe, 1)
      }
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }

  private getCategories() {
    this.httpContext.read<any>(this.endpoints.categoryEndpoints.list).subscribe((x) => {
      this.categories = x
      this.inAsyncMode = false
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }
}
