import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CurrencyVm } from '../currency.models';
import { CurrencyEndpoints } from '../currencyEndpoints';
import { NotificationType } from '../../../../core/core-interface';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'currency-component',
  templateUrl: './currency-list.component.html'
})
export class CurrencyListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Currencies";
  public currencies: CurrencyVm[] = new Array<CurrencyVm>();
  private form = new FormData();
  public isUploading = false
 
  public constructor(private currencyEndpoints: CurrencyEndpoints) {
    super('currency-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getCurrencies();
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

  public importCurrencies() {
    this.inAsyncMode = true
    this.httpContext.raw('POST', this.currencyEndpoints.currency.import, this.form, {
      reportProgress: true
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isUploading = true

      } else if (x instanceof HttpResponse) {

        this.isUploading = false
        this.getCurrencies()
        this.toastNotification("Upload Successfull", "Currencies imported successfully", NotificationType.success)
      }
    }, (error) => {
      this.isUploading = false
        this.inAsyncMode = false
      this.handleError(error)
    })
  }

  public downloadCurrencies() {
    this.inAsyncMode = true
    this.httpContext.raw<Blob>("GET", this.currencyEndpoints.currency.export, null, {
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
        a.download = `acdte.currencies.csv`;
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
  
  private getCurrencies() {
    this.httpContext.read<any>(this.currencyEndpoints.currency.list).subscribe((x) => {
      this.currencies = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail, true) });
  }

  public deleteCurrency(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.currencyEndpoints.currency.delete + id).subscribe(() => {
      this.getCurrencies();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
