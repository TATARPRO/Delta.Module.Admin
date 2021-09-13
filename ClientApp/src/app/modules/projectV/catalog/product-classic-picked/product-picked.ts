import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { WidgetZone } from '../../../../core/core-interface';
import { ProductClassicPickedForm } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { WidgetFormGroup } from '../../../../core/widget.common';


@Component({
  selector: 'product-picked',
  templateUrl: './product-picked.html'
})
export class ProductClassicPickedComponent extends ComponentBase implements OnInit, AfterViewInit {
  public model: ProductClassicPickedForm = new ProductClassicPickedForm();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Product Classic Picked";
  public isEditMode = false;
  public isSubmitting = false;
  public saleProduct: string;

  private apiRoutes = {
    read: "/projectv/product-classic-picked/read/",
    create: "/projectv/product-classic-picked/create/",
    update: "/projectv/product-classic-picked/update/"
  }
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private coreEndpoints: EndpointMetadata, private endpoints: CatalogEndpoints, private corevEnds: CoreVEndpoints) {
    super('product-picked')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Product Classic Picked: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getWidgetZones();
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

  public removeSaleProduct(data: any) {
    this.model.setting.saleSettings.productId = undefined
  }

  public setSaleProduct(data: any) {
    this.model.setting.saleSettings.productId = data.product.id
    this.saleProduct = data.product.name
  }

  public setPromotedProduct(data: any) {
    let index = this.model.setting.promotedSettings.selectedProducts.findIndex(x => x.id == data.product.id)
    if (index < 0) {
      this.model.setting.promotedSettings.selectedProducts.push(data.product)
    }
  }

  public removePromotedProduct(data: any) {
    let index = this.model.setting.promotedSettings.selectedProducts.findIndex(x => x.id == data.productId)
    if (index > -1) {
      this.model.setting.promotedSettings.selectedProducts.splice(index, 1)
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

  private getWidgetZones() {
    this.httpContext.read<any>(this.coreEndpoints.widgetZoneEndpoints.list).subscribe((x) => {
      this.widgetZones = x
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }
}
