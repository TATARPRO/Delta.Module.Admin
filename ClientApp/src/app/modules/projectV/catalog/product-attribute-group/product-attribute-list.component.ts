import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CatalogEndpoints } from '../catalog-endpoints';
import { ProductAttributeGroupFormVm } from '../catalog-models';


@Component({
  selector: 'attributegr-list-component',
  templateUrl: './product-attribute-list.component.html'
})
export class ProductAttributeGroupListComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "Product Attribute Group";
  public groups: ProductAttributeGroupFormVm[] = new Array<ProductAttributeGroupFormVm>();

  public constructor(private catalogEnpoints: CatalogEndpoints) {
    super('attributegr-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = false
    this.getAttributeGroups();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getAttributeGroups() {
    this.httpContext.read<any>(this.catalogEnpoints.productAttributeGroupEndpoints.list).subscribe((x) => {
      this.groups = x
      this.inAsyncMode = false
    }, (fail) => {
      this.inAsyncMode = false;
      this.handleError(fail)
    });
  }

  public deleteGroup(id: number) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.catalogEnpoints.productAttributeGroupEndpoints.delete + id).subscribe(() => {
      this.getAttributeGroups();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
