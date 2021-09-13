import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { WidgetZone } from '../../../../core/core-interface';
import { Category, CategoryWidgetForm, CategoryWidgetFormGroup } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';


@Component({
  selector: 'category-mobile',
  templateUrl: './category-mobile.html'
})
export class CategoryMobileComponent extends ComponentBase implements OnInit, AfterViewInit {
 
  public model: CategoryWidgetForm = new CategoryWidgetForm();
  public categories: Category[] = new Array<Category>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetFormGroup: CategoryWidgetFormGroup = new CategoryWidgetFormGroup();
  public title: string = "Mobile Category";
  public isEditMode = false;
  public isSubmitting = false;
  private apiRoutes = {
    read: "/projectv/category-mobile/read/",
    create: "/projectv/category-mobile/create/",
    update: "/projectv/category-mobile/update/"
  }
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private endpoints: CatalogEndpoints, private coreEndpoints: EndpointMetadata) {
    super('category-mobile')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Mobile Category: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getWidgetZones();
    this.getCategories();
    if (this.model && this.model.id) {
      this.getWidgetinstance(this.model.id)
    }
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.widgetFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

      if (!this.isEditMode)
        result = this.createWidget()
      else 
        result = this.updateWidget()
      
      result.subscribe(() => {
        this.router.navigateByUrl("/widget-instances")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  public toggleCategories(id: number) {
    let index = this.model.settings.categories.indexOf(id)
    if (index > -1) {
      this.model.settings.categories.splice(index, 1)
    } else {
      this.model.settings.categories.push(id)
    }
  }

  private createWidget() {
    return this.httpContext.create<any>(this.apiRoutes.create, this.model)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.apiRoutes.update, this.model)
  }

  private getWidgetinstance(id: number) {
    this.httpContext.read<any>(this.apiRoutes.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

  private getCategories() {
    this.httpContext.read<any>(this.endpoints.categoryEndpoints.list).subscribe(x => {
      this.categories = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail, true)
    });
  }

  private getWidgetZones() {
    this.httpContext.read<any>(this.coreEndpoints.widgetZoneEndpoints.list).subscribe((x) => {
      this.widgetZones = x
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail, true)
    });
  }
}
