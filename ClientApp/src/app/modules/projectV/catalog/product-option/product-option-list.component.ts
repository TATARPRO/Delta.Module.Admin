import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CatalogEndpoints } from '../catalog-endpoints';
import { ProductOption } from '../catalog-models';


@Component({
  selector: 'option-list-component',
  templateUrl: './product-option-list.component.html'
})
export class ProductOptionListComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "Product Options";
  public options: ProductOption[] = new Array<ProductOption>();

  public constructor(private catalogEnpoints: CatalogEndpoints) {
    super('option-list-component')
  }

  ngOnInit() {
    this.getProductOptions();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getProductOptions() {
    this.httpContext.read<any>(this.catalogEnpoints.productOptionEndpoints.list).subscribe((x) => {
      this.options = x
      this.inAsyncMode = false
    });
  }

  public deleteOption(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.catalogEnpoints.productOptionEndpoints.delete + id).subscribe(() => {
      this.getProductOptions();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
