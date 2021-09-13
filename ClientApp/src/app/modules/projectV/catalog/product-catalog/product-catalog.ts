import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { WidgetZone, SmartTableParam } from '../../../../core/core-interface';
import { Category, ProductWidgetForm, ProductWidgetFormGroup } from '../catalog-models';
import { Country } from '../../core/corev-models';
import { CatalogEndpoints } from '../catalog-endpoints';
import { CoreVEndpoints } from '../../core/corev-endpoints';


@Component({
  selector: 'product-catalog',
  templateUrl: './product-catalog.html'
})
export class ProductCatalogComponent extends ComponentBase implements OnInit, AfterViewInit {

  public model: ProductWidgetForm = new ProductWidgetForm();
  public categories: Category[] = new Array<Category>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public countries: Country[] = new Array<Country>();
  public widgetOrderBy: [{ id: 0, name: "" }]
  public widgetFormGroup: ProductWidgetFormGroup = new ProductWidgetFormGroup();
  public title: string = "Product Catalog";
  public isEditMode = false;
  public isSubmitting = false;
  private apiRoutes = {
    read: "/projectv/product-catalog/read/",
    create: "/projectv/product-catalog/create/",
    update: "/projectv/product-catalog/update/"
  }
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private coreEndpoints: EndpointMetadata, private endpoints: CatalogEndpoints, private corevEnds: CoreVEndpoints) {
    super('product-catalog')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Product Catalog: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getWidgetZones();
    this.getCountries();
    this.getCategories();
    this.getWidgetOrdering();
    if (this.model && this.model.id) {
      this.isEditMode = true
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

  private createWidget() {
    return this.httpContext.create<any>(this.apiRoutes.create, this.model)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.apiRoutes.update + this.model.id, this.model)
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

  private getCountries() {
    this.httpContext.read<any>(this.corevEnds.countryEndpoints.list).subscribe(x => this.countries = x, (fail) => {
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

  private getWidgetOrdering() {
    this.httpContext.read<any>(this.endpoints.productsOrderBy).subscribe((x) => {
      this.widgetOrderBy = x
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }
}
