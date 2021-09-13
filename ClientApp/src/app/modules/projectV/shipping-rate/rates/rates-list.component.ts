import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { DialogOptions, NotificationType } from '../../../../core/core-interface';

class RateSearchOption {
  id: string;
  name: string;
}
class ShippingRate {
  id: number;
  name: string;
  taxClass: string;
  providerName: string;
  countryName: string;
  stateOrProvinceName: string;
  shippingPrice: number;
}
@Component({
  selector: 'rates-list-component',
  templateUrl: './rates-list.component.html'
})
export class RateListComponent extends ComponentBase implements AfterViewInit {

  public title: string = "Shipping Rates";
  public rateSearchOptions: RateSearchOption[] = new Array<RateSearchOption>();
  private apiEndpoints = {
    list: "/projectv/shipping-rates/search",
    delete: "/projectv/shipping-rates/delete",
    searchOptions: "/projectv/shipping-rates/search-options/"
  }
  public constructor() {
    super('rates-list-component')
    this.smartTableResult.items = new Array<ShippingRate>();
    this.paginationFetchUrl = this.apiEndpoints.list;
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getRates();
    this.getRateSearchOptions();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getRates() {
    this.httpContext.search<any>(this.apiEndpoints.list, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x

      this.smartTableParam.pagination.pageSize = this.smartTableResult.pageSize;
      this.smartTableParam.pagination.requestedPage = this.smartTableResult.currentPage;

      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail)});
  }

  private getRateSearchOptions() {
    this.httpContext.read<RateSearchOption[]>(this.apiEndpoints.searchOptions).subscribe((x) => {
      this.rateSearchOptions = x
    });
  }

  public deleteRate(id: number) {
    this.showModalDialog("Delete Shipping Rate", "Do you want to delete this shipping configuration",
      NotificationType.warning, DialogOptions.YesCancel).then(() => {
    this.inAsyncMode = true
        this.httpContext.delete<any>(this.apiEndpoints.delete + id).subscribe(() => {
          this.toastNotification("Shipping Configuration", `Shipping configuration deleted.`, NotificationType.success)
          this.getRates();
        },
          (fail) => {
            this.inAsyncMode = false
            this.handleError(fail, true);
          });
      }).catch(() => { })
  }
}
