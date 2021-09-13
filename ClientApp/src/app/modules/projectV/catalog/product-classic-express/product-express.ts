import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { WidgetZone, SmartTableParam } from '../../../../core/core-interface';
import { Category, ProductClassicExpressForm } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';
import { Country } from '../../core/corev-models';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { WidgetFormGroup } from '../../../../core/widget.common';


@Component({
  selector: 'product-express',
  templateUrl: './product-express.html'
})
export class ProductClassicExpressComponent extends ComponentBase implements OnInit, AfterViewInit {
  public model: ProductClassicExpressForm = new ProductClassicExpressForm();
  public categories: Category[] = new Array<Category>();
  public countries: Country[] = new Array<Country>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetOrderBy: [{ id: 0, name: "" }]
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Product Express Classic";
  public isEditMode = false;
  public isSubmitting = false;
  public saleProduct: string;

  private apiRoutes = {
    read: "/projectv/product-classic-express/read/",
    create: "/projectv/product-classic-express/create/",
    update: "/projectv/product-classic-express/update/"
  }
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private coreEndpoints: EndpointMetadata, private endpoints: CatalogEndpoints, private corevEnds: CoreVEndpoints) {
    super('product-express')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Product Express Classic: Delta Admin")
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

  public removeSaleProduct(data: any) {
    this.model.setting.saleSettings.productId = undefined
  }

  public setSaleProduct(data: any) {
    this.model.setting.saleSettings.productId = data.product.id
    this.saleProduct = data.product.name
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
    this.httpContext.read<any>(this.endpoints.categoryEndpoints.list).subscribe(x => this.categories = x, (fail) => {
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
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
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

  private getWidgetOrdering() {
    this.httpContext.read<any>(this.endpoints.productsOrderBy).subscribe((x) => {
      this.widgetOrderBy = x
    }, (fail) => {
      this.handleError(fail, true)
    });
  }
}
