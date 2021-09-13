import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { CoreVEndpoints } from '../corev-endpoints';
import { Country } from '../corev-models';
import { NotificationType, SmartTableResult } from '../../../../core/core-interface';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'country-list-component',
  templateUrl: './country-list.component.html'
})
export class CountryListComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "Countries";
  public countries: Country[] = new Array<Country>();
  private form = new FormData();
  public isUploading = false

  public constructor(private endpoints: CoreVEndpoints) {
    super('country-list-component')
  }

  ngOnInit() {
    this.getCountries();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getCountries() {
    this.httpContext.read<Country[]>(this.endpoints.countryEndpoints.list).subscribe((x) => {
      this.countries = x
      this.inAsyncMode = false
    }, () => {});
  }

  public fileChanged(fileList: FileList) {
    if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
      this.form = new FormData();
      this.form.append("file", fileList[0], "countryList")
    }
  }

  public importCountries() {
    this.inAsyncMode = true
    this.httpContext.raw('POST', this.endpoints.countryEndpoints.upload, this.form, {
      reportProgress: true
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isUploading = true

      } else if (x instanceof HttpResponse) {

        this.isUploading = false
        this.getCountries()
        this.toastNotification("Upload Successfull", "Countries imported successfully", NotificationType.success)
      }
    }, (error) => {
        this.inAsyncMode = false
      this.handleError(error)
    })
  }

  public downloadCountries() {
    this.inAsyncMode = false
    this.httpContext.raw<Blob>("GET", this.endpoints.countryEndpoints.download, null, {
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
        a.download = `acdte.countries.csv`;
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

  public deleteCountry(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.countryEndpoints.delete + id).subscribe((x) => {
      this.getCountries();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
