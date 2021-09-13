import { Component, AfterViewInit } from '@angular/core';
import { SearchOption } from '../../../../core/core-interface';
import ComponentBase from '../../../../core/componentBase';
import { CatalogEndpoints } from '../catalog-endpoints';
import { ProductHistoryItem } from '../catalog-models';


@Component({
  selector: 'price-history-component',
  templateUrl: './price-history.component.html'
})
export class PriceHistoryComponent extends ComponentBase implements AfterViewInit {
 
  public title: string = "Product Price History";
  public searchOptions: SearchOption[] = new Array<SearchOption>()
  public constructor(private endpoints: CatalogEndpoints) {
    super('price-history-component')
    this.smartTableResult.items = new Array<ProductHistoryItem>();
    this.paginationFetchUrl = endpoints.priceHistory.search;
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getSearchOptions()
    this.getPriceHistories();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getPriceHistories() {
    this.httpContext.search<any>(this.endpoints.priceHistory.search, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x

      this.smartTableParam.pagination.pageSize = this.smartTableResult.pageSize;
      this.smartTableParam.pagination.requestedPage = this.smartTableResult.currentPage;
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  private getSearchOptions() {
    this.httpContext.read<SearchOption[]>(this.endpoints.priceHistory.searchOptions).subscribe((x) => {
      this.searchOptions = x
    }, () => { });
  }
}
