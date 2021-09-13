import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { WidgetZone } from '../../../../core/core-interface';
import { Category, TabbedWidgetForm, TabbedWidgetSettings } from '../catalog-models';
import { CatalogEndpoints } from '../catalog-endpoints';
import { Country } from '../../core/corev-models';
import { CoreVEndpoints } from '../../core/corev-endpoints';
import { WidgetFormGroup } from '../../../../core/widget.common';


@Component({
  selector: 'product-express',
  templateUrl: './product-express.html'
})
export class ProductExpressTabComponent extends ComponentBase implements OnInit, AfterViewInit {

  public model: TabbedWidgetForm = new TabbedWidgetForm();
  public categories: Category[] = new Array<Category>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetOrderBy: [{ id: 0, name: "" }]
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public countries: Country[] = new Array<Country>();
  public title: string = "Product Express Tab 1";
  public isEditMode = false;
  public isSubmitting = false;
  public form: FormData = new FormData();
  private apiRoutes = {
    read: "/projectv/product-tab1-express/read/",
    create: "/projectv/product-tab1-express/create/",
    update: "/projectv/product-tab1-express/update/"
  }
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private coreEndpoints: EndpointMetadata, private endpoints: CatalogEndpoints, private corevEnds: CoreVEndpoints) {
    super('product-express')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Product Express Tab1: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getCountries();
    this.getWidgetZones();
    this.getCategories();
    this.getWidgetOrdering();
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
    this.model.items.push(new TabbedWidgetSettings())
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

  private getCountries() {
    this.httpContext.read<any>(this.corevEnds.countryEndpoints.list).subscribe(x => this.countries = x, (fail) => {
      this.handleError(fail, true)
    });
  }

  private createFormData() {
    for (let key in this.model) {
      if (this.model[key] != undefined) {
        if (this.model[key] instanceof Array) {
          this.model[key].forEach((item, index) => {
            for (let arrayObjectItem in item) {
              this.form.append(`${key}[${index}][${arrayObjectItem}]`, item[arrayObjectItem])
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

  private getCategories() {
    this.httpContext.read<any>(this.endpoints.categoryEndpoints.list).subscribe(x => {
      this.categories = x
      if(!this.isEditMode){
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

  private getWidgetOrdering() {
    this.httpContext.read<any>(this.endpoints.productsOrderBy).subscribe((x) => {
      this.widgetOrderBy = x
    }, (fail) => {
      this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }
}
