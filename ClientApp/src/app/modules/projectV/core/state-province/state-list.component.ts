import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { NotificationType, SmartTableResult } from '../../../../core/core-interface';
import { CoreVEndpoints } from '../corev-endpoints';
import { Country, StateProvince } from '../corev-models';


@Component({
  selector: 'state-list-component',
  templateUrl: './state-list.component.html'
})
export class StatesProvinceListComponent extends ComponentBase implements AfterViewInit, OnInit {
  
  public title: string = "States or Provinces";
  public countries: Country[] = new Array<Country>();
  private form = new FormData();
  public uploadCountryId: string = undefined
  public downloadCountryId: string = undefined
  public countryUploadHasError = false
  public statesDownloadHasError = false
  public isUploading = false

  public constructor(private endpoints: CoreVEndpoints) {
    super('state-list-component')
    this.smartTableResult.items = new Array<StateProvince>();
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getStates();
    this.getCountries()
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getStates() {
    this.httpContext.raw<SmartTableResult>('POST', this.endpoints.statesEndpoints.search, this.smartTableParam, {
      reportProgress: true
    }).subscribe((x) => {
      if (x instanceof HttpResponse) {
        this.smartTableResult = x.body
        this.inAsyncMode = false
      }
    });
  }

  private getCountries() {
    this.httpContext.read<Country[]>(this.endpoints.countryEndpoints.list).subscribe((x) => {
      this.countries = x
    });
  }

  public fileChanged(fileList: FileList) {
    if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
      this.form = new FormData();
      this.form.append("file", fileList[0], "stateList")
    }
  }

  public importStates() {
    if (this.uploadCountryId == undefined) {
      this.countryUploadHasError = true
      return
    }
      this.countryUploadHasError = false
    this.inAsyncMode = true
      this.httpContext.raw('POST', this.endpoints.statesEndpoints.upload + this.uploadCountryId, this.form, {
        reportProgress: true
      }).subscribe((x) => {
        if (x.type != HttpEventType.Response) {
          this.isUploading = true
        } else if (x instanceof HttpResponse) {
          this.uploadCountryId = undefined
          this.isUploading = false
          this.getStates()
          this.toastNotification("Upload Successfull", "States imported successfully", NotificationType.success)
        }
      }, (error) => {
          this.inAsyncMode = false
        this.handleError(error)
      })
  }

  public downloadStates() {
    if (this.downloadCountryId == undefined) {
      this.statesDownloadHasError = true
      return
    }

    this.statesDownloadHasError = true
    this.httpContext.raw<Blob>("GET", this.endpoints.statesEndpoints.download + this.downloadCountryId, null, {
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
        a.download = `acdte.states.csv`;
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

  public deleteState(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.endpoints.statesEndpoints.delete + id).subscribe(() => {
      this.getStates();
    }, (fail) => {
        this.handleError(fail)
        this.inAsyncMode = false
    });
  }
}
