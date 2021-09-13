import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CatalogEndpoints } from '../catalog-endpoints';
import { Brand } from '../catalog-models';


@Component({
  selector: 'brand-list-component',
  templateUrl: './brand-list.component.html'
})
export class BrandListComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "Brands";
  public brands: Brand[] = new Array<Brand>();

  public constructor(private catalogEnpoints: CatalogEndpoints) {
    super('brand-list-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getBrands();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getBrands() {
    this.httpContext.read<any>(this.catalogEnpoints.brandEndpoints.list).subscribe((x) => {
      this.brands = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  public deleteBrand(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.catalogEnpoints.brandEndpoints.delete + id).subscribe(() => {
      this.getBrands();
    }, (fail) => {
        this.handleError(fail)
        this.inAsyncMode = false
    });
  }
}
