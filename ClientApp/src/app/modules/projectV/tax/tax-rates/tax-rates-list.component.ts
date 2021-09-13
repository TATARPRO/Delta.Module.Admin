import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { TaxRateListVm } from '../tax.models';
import { NotificationType, DialogOptions } from '../../../../core/core-interface';
import { TaxEndpoints } from '../taxEndpoints';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Country } from '../../core/corev-models';
import { CoreVEndpoints } from '../../core/corev-endpoints';


@Component({
  selector: 'taxrates-component',
  templateUrl: './tax-rates-list.component.html'
})
export class TaxRatesListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Tax Rates";
  public taxRates: TaxRateListVm[] = new Array<TaxRateListVm>();
  private form = new FormData();
  public uploadCountryId: string = undefined
  public downloadCountryId: string = undefined
  public countryUploadHasError = false
  public statesDownloadHasError = false
  public isUploading = false
  public countries: Country[] = new Array<Country>();
  
  public constructor(private taxEndpoints: TaxEndpoints, private endpoints: CoreVEndpoints) {
    super('taxrates-component')
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getCountries()
    this.getTaxRates();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getTaxRates() {
    this.httpContext.read<any>(this.taxEndpoints.taxRates.list).subscribe((x) => {
      this.taxRates = x
      this.inAsyncMode = false
    });
  }

  public fileChanged(fileList: FileList) {
    if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
      this.form = new FormData();
      this.form.append("csvFile", fileList[0], "taxRateList")
    }
  }

  private getCountries() {
    this.httpContext.read<Country[]>(this.endpoints.countryEndpoints.list).subscribe((x) => {
      this.countries = x
    });
  }

  public importTaxRates() {
    if (this.uploadCountryId == undefined) {
      this.countryUploadHasError = true
      return
    }

    this.form.append("countryId", this.uploadCountryId)
    this.countryUploadHasError = false
    this.inAsyncMode = true
    this.httpContext.raw('POST', this.taxEndpoints.taxRates.upload, this.form, {
      reportProgress: true
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isUploading = true
      } else if (x instanceof HttpResponse) {

        this.uploadCountryId = undefined
        this.isUploading = false
        this.getTaxRates()
        this.toastNotification("Upload Successfull", "Tax Rates imported successfully", NotificationType.success)
      }
    }, (error) => {
        this.inAsyncMode = false
      this.handleError(error)
    })
  }

  public downloadTaxRates() {
    if (this.downloadCountryId == undefined) {
      this.statesDownloadHasError = true
      return
    }

    this.statesDownloadHasError = false
    this.httpContext.raw<Blob>("GET", this.taxEndpoints.taxRates.download + this.downloadCountryId, null, {
      reportProgress: true,
      responseType: 'blob'
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isUploading = true
      } else if (x instanceof HttpResponse) {
        this.isUploading = false
        this.downloadCountryId = undefined

        let downloadedFile = new Blob([x.body], { type: "text/csv; charset=utf-8" });

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = `acdte.tax-rates.csv`;
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

  public deleteTaxRate(id: string) {
    this.showModalDialog("Delete Tax Rate", "Are you sure you want to delete this tax rate", NotificationType.warning, DialogOptions.YesCancel)
      .then(() => {
        this.inAsyncMode = true
        this.httpContext.delete<any>(this.taxEndpoints.taxRates.delete + id).subscribe(() => {
          this.getTaxRates();
        }, (fail) => {
            this.inAsyncMode = false
          this.handleError(fail)
        });
      }).catch(() => { })
  }
}
