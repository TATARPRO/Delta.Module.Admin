import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { WidgetZone } from '../../../../core/core-interface';
import { ProductPickedTabForm, ProductPickedTabSetting } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';
import { WidgetFormGroup } from '../../../../core/widget.common';


@Component({
  selector: 'product-picked',
  templateUrl: './product-picked.html'
})
export class ProductTabPickedComponent extends ComponentBase implements OnInit, AfterViewInit {

  public model: ProductPickedTabForm = new ProductPickedTabForm();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Product Picked Tab 1";
  public isEditMode = false;
  public isSubmitting = false;
  public form: FormData = new FormData();
  private apiRoutes = {
    read: "/projectv/product-tab1-picked/read/",
    create: "/projectv/product-tab1-picked/create/",
    update: "/projectv/product-tab1-picked/update/"
  }
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private coreEndpoints: EndpointMetadata, private endpoints: CatalogEndpoints) {
    super('product-picked')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Product Picked Tab 1: Delta Admin")
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
      this.createFormData();

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

  public addTab() {
    this.model.items.push(new ProductPickedTabSetting())
  }

  public removeTab(index: number) {
    this.model.items.splice(index, 1)
  }

  public leftImageChanged(fileList: FileList, index) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.getLeftFilePreview(file, index);
    }
  }

  public getLeftFilePreview(file: File, index: number) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.model.items[index].leftImage = reader.result }
  }

  public rightImageChanged(fileList: FileList, index) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.getRightFilePreview(file, index);
    }
  }

  public getRightFilePreview(file: File, index: number) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.model.items[index].rightImage = reader.result }
  }

  public setSelectedProducts(data: any, i: number) {
    let index = this.model.items[i].selectedProducts.findIndex(x => x.id == data.product.id)
    if (index < 0) {
      this.model.items[i].selectedProducts.push(data.product)
    }
  }

  public removeSelectedProducts(data: any, i: number) {
    let index = this.model.items[i].selectedProducts.findIndex(x => x.id == data.productId)
    if (index > -1) {
      this.model.items[i].selectedProducts.splice(index, 1)
    }
  }

  private createFormData() {
    for (let key in this.model) {
      if (this.model[key] != undefined) {
        if (this.model[key] instanceof Array) {
          this.model[key].forEach((item, index) => {
            for (let arrayObjectItem in item) {
              if (this.model[key][index][arrayObjectItem] instanceof Array) {
                this.model[key][index][arrayObjectItem].forEach((it, i) => {
                  for (let pr in it) {
                    this.form.append(`${key}[${index}][${arrayObjectItem}][${i}][${pr}]`, it[pr])
                  }
                })
              } else {
                this.form.append(`${key}[${index}][${arrayObjectItem}]`, item[arrayObjectItem])
              }
            }
          })
        } else {
          let value = this.model[key];
          this.form.append(key, value)
        }
      }
    }
  }

  private createWidget() {
    return this.httpContext.create<any>(this.apiRoutes.create, this.form)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.apiRoutes.update + this.model.id, this.form)
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
      this.handleError(fail, true)
    });
  }
}
