import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { ExchangeRateListVm } from '../currency.models';
import { NotificationType, DialogOptions } from '../../../../core/core-interface';
import { CurrencyEndpoints } from '../currencyEndpoints';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'exchangerate-component',
  templateUrl: './exchange-list.component.html'
})
export class ExchangeRateListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Exchange Rates";
  public exchangeRates: ExchangeRateListVm[] = new Array<ExchangeRateListVm>();
  private form = new FormData();
  public isUploading = false
  
  public constructor(private currencyEndpoints: CurrencyEndpoints) {
    super('exchangerate-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getExchangeRates();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  public fileChanged(fileList: FileList) {
    if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
      this.form = new FormData();
      this.form.append("file", fileList[0], "currencyList")
    }
  }

  public importRates() {
    this.inAsyncMode = true
    this.httpContext.raw('POST', this.currencyEndpoints.exchangeRate.upload, this.form, {
      reportProgress: true
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isUploading = true
      } else if (x instanceof HttpResponse) {

        this.isUploading = false
        this.getExchangeRates()
        this.toastNotification("Upload Successfull", "Exchange rates imported successfully", NotificationType.success)
      }
    }, (error) => {
        this.inAsyncMode = false
      this.handleError(error)
    })
  }

  public downloadRates() {
    this.inAsyncMode = true
    this.httpContext.raw<Blob>("GET", this.currencyEndpoints.exchangeRate.download, null, {
      reportProgress: true,
      responseType: 'blob'
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isUploading = true
      } else if (x instanceof HttpResponse) {
        this.isUploading = false
        this.inAsyncMode = false

        let downloadedFile = new Blob([x.body], { type: "text/csv; charset=utf-8" });

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = `acdte.exchange-rates.csv`;
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

  private getExchangeRates() {
    this.httpContext.read<any>(this.currencyEndpoints.exchangeRate.list).subscribe((x) => {
      this.exchangeRates = x
      this.inAsyncMode = false
    });
  }

  public deleteExchangeRate(id: number) {
    this.showModalDialog("Delete Exchange Rate", "Are you sure you want to delete this exchange rate", NotificationType.warning, DialogOptions.YesCancel)
      .then(() => {
        this.inAsyncMode = true
        this.httpContext.delete<any>(this.currencyEndpoints.exchangeRate.delete + id).subscribe(() => {
          this.getExchangeRates();
        }, (fail) => {
            this.inAsyncMode = false
          this.handleError(fail)
        });
      }).catch(() => { })
  }
}
