import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { Validators, NgForm } from '@angular/forms';
import { CustomFormControl, CustomFormGroup } from '../../../core/formControlExtension';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';


class WebPageForm {
  id: number;
  content: string;
  tags: string;
  name: string;
  slug: string;
  title: string;
  metaKeywords: string;
  metaDescription: string;
  isPublished: boolean;
}

class WebPageFormGroup extends CustomFormGroup  {
  constructor() {
    super({
      name: new CustomFormControl("Name", "name", "", "text", "a", Validators.compose([
        Validators.required
      ])),
      tags: new CustomFormControl("Tags", "tags", "", "text"),
      slug: new CustomFormControl("Slug", "slug", "", "text"),
      metaKeywords: new CustomFormControl("Meta Keywords", "metaKeywords", "", "text"),
      metaDescription: new CustomFormControl("Meta Description", "metaDescription", "", "text"),
      isPublished: new CustomFormControl("Is Published", "isPublished", "", "checkbox")
    })
  }
}

@Component({
  selector: 'page-form-component',
  templateUrl: './page-form.component.html'
})
export class WebPageFormComponent extends ComponentBase implements AfterViewInit, OnInit {

  public model: WebPageForm = new WebPageForm();
  public pageFormGroup: WebPageFormGroup = new WebPageFormGroup();
  public title: string = "Web Pages";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('page-form-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
  }

  ngOnInit() {
    if (this.model && this.model.id) {
      this.getWebPage(this.model.id)
      this.inAsyncMode = true
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.pageFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createWebPage()
      else 
        result = this.updateWebPage()
      
      result.subscribe(() => {
        this.router.navigateByUrl("/module/cms/webpages")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  private createWebPage() {
    return this.httpContext.create<any>(this.endpoints.webPagEndpoints.create, this.model)
  }

  private updateWebPage() {
    return this.httpContext.update<any>(this.endpoints.webPagEndpoints.update, this.model)
  }

  private getWebPage(id: number) {
    this.httpContext.read<any>(this.endpoints.webPagEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
      }, (fail) => {
        this.inAsyncMode = false
       this.handleError(fail)
    });
  }
}
