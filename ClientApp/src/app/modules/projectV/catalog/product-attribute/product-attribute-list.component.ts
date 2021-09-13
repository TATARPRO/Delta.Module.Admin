import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CatalogEndpoints } from '../catalog-endpoints';
import { ProductAttributeVm } from '../catalog-models';


@Component({
  selector: 'prattribute-list-component',
  templateUrl: './product-attribute-list.component.html'
})
export class ProductAttributeListComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "Product Attributes";
  public attributes: ProductAttributeVm[] = new Array<ProductAttributeVm>();

  public constructor(private catalogEnpoints: CatalogEndpoints) {
    super('prattribute-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getProductAttributes();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getProductAttributes() {
    this.httpContext.read<any>(this.catalogEnpoints.productAttributeEndpoints.list).subscribe((x) => {
      this.attributes = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  public deleteProductAttribute(id: number) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.catalogEnpoints.productAttributeEndpoints.delete + id).subscribe(() => {
      this.getProductAttributes();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
