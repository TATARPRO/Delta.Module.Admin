import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { OrderListVm } from '../order.models';
import { NotificationType, DialogOptions } from '../../../../core/core-interface';
import { OrderEndpoints } from '../orderEndpoints';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Country } from '../../core/corev-models';
import { CoreVEndpoints } from '../../core/corev-endpoints';


@Component({
  selector: 'checked-component',
  templateUrl: './checked-list.component.html'
})
export class CheckedListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Orders";
  public countries: Country[] = new Array<Country>();
  public isDownloading = false
  public downloadCountryId

  public constructor(private orderEndpoints: OrderEndpoints, private endpoints: CoreVEndpoints) {
    super('checked-component')
    this.smartTableResult.items = new Array<OrderListVm>()
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getCountries()
    this.getOrders();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getOrders() {
    this.httpContext.search<any>(this.orderEndpoints.checked.search, this.smartTableParam).subscribe((x) => {
      this.smartTableResult = x
      this.inAsyncMode = false
    });
  }

  private getCountries() {
    this.httpContext.read<Country[]>(this.endpoints.countryEndpoints.list).subscribe((x) => {
      this.countries = x
    });
  }

  public downloadOrders() {
    this.httpContext.raw<Blob>("GET", this.orderEndpoints.checked.download, null, {
      reportProgress: true,
      responseType: 'blob'
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isDownloading = true
      } else if (x instanceof HttpResponse) {
        this.isDownloading = false
        
        let downloadedFile = new Blob([x.body], { type: "text/csv; charset=utf-8" });

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = `acdte.orders.csv`;
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      }
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public deleteOrder(id: string) {
    this.showModalDialog("Delete Order", "Are you sure you want to delete this order?", NotificationType.warning, DialogOptions.YesCancel)
      .then(() => {
        this.inAsyncMode = true
        this.httpContext.delete<any>(this.orderEndpoints.checked.delete + id).subscribe(() => {
          this.getOrders();
        }, (fail) => {
            this.inAsyncMode = false
          this.handleError(fail)
        });
      }).catch(() => { })
  }
}
