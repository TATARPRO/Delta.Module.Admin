import { Component, AfterViewInit } from '@angular/core';
import { NotificationType, DialogOptions, SearchOption } from '../../../../core/core-interface';
import ComponentBase from '../../../../core/componentBase';
import { CatalogEndpoints } from '../catalog-endpoints';
import { ProductListItem } from '../catalog-models';



@Component({
  selector: 'product-list-component',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent extends ComponentBase implements AfterViewInit {
 
  public title: string = "Products";
  public searchOptions: SearchOption[] = new Array<SearchOption>()
  public constructor(private endpoints: CatalogEndpoints) {
    super('product-list-component')
    this.smartTableResult.items = new Array<ProductListItem>();
    this.paginationFetchUrl = endpoints.productEndpoints.list;
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getSearchOptions()
    this.getProducts();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getProducts() {
    this.httpContext.search<any>(this.endpoints.productEndpoints.list, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x

      this.smartTableParam.pagination.pageSize = this.smartTableResult.pageSize;
      this.smartTableParam.pagination.requestedPage = this.smartTableResult.currentPage;
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  private getSearchOptions() {
    this.httpContext.read<SearchOption[]>(this.endpoints.productEndpoints.searchOptions).subscribe((x) => {
      this.searchOptions = x
    }, () => { });
  }

  public deleteProduct(id: number) {
    this.showModalDialog("Delete Product", "Are you sure you want to delete this product", NotificationType.warning,
      DialogOptions.YesCancel).then(() => {
        this.inAsyncMode = true
        this.httpContext.delete<any>(this.endpoints.productEndpoints.delete + id).subscribe(() => {
          this.toastNotification("Product Deleted", `product ${this.smartTableResult.items.find(x => x.id == id).name} has been deleted.`, NotificationType.success)
          this.getProducts();
        },
          (fail) => {
            this.inAsyncMode = false
            this.handleError(fail, true);
          });
      }).catch(() => { })
  }
}
