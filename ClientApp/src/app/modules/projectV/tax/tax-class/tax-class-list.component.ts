import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../../core/componentBase';
import { NotificationType } from '../../../../core/core-interface';
import { TaxClassListVm } from '../tax.models';
import { TaxEndpoints } from '../taxEndpoints';


@Component({
  selector: 'taxclass-list-component',
  templateUrl: './tax-class-list.component.html'
})
export class TaxClassListComponent extends ComponentBase implements AfterViewInit, OnInit {
 
  public title: string = "Tax Classes";
  public taxClasses: TaxClassListVm[] = new Array<TaxClassListVm>();
  private form = new FormData();
  public isUploading = false
 
  public constructor(private taxEndpoints: TaxEndpoints) {
    super('taxclass-list-component')
  }

  ngOnInit() {
    this.getTaxClasses();
    this.inAsyncMode = true
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  private getTaxClasses() {
    this.httpContext.read<any>(this.taxEndpoints.taxClass.list).subscribe((x) => {
      this.taxClasses = x
      this.inAsyncMode = false
    }, (fail) => { this.inAsyncMode = false; this.handleError(fail) });
  }

  public fileChanged(fileList: FileList) {
    if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
      this.form = new FormData();
      this.form.append("file", fileList[0], "taxClassList")
    }
  }

  public importTaxClasses() {
    this.inAsyncMode = true
    this.httpContext.raw('POST', this.taxEndpoints.taxClass.upload, this.form, {
      reportProgress: true
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isUploading = true

      } else if (x instanceof HttpResponse) {

        this.isUploading = false
        this.getTaxClasses()
        this.toastNotification("Upload Successfull", "Tax Classes imported successfully", NotificationType.success)
      }
    }, (error) => {
      this.isUploading = false
        this.inAsyncMode = false
      this.handleError(error)
    })
  }

  public downloadTaxClasses() {
    this.inAsyncMode = true
    this.httpContext.raw<Blob>("GET", this.taxEndpoints.taxClass.download, null, {
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
        a.download = `acdte.tax-classes.csv`;
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

  public deleteTaxClass(id: string) {
    this.inAsyncMode = true
    this.httpContext.delete<any>(this.taxEndpoints.taxClass.delete + id).subscribe(() => {
      this.getTaxClasses();
    }, (fail) => {
        this.inAsyncMode = false
        this.handleError(fail)
    });
  }
}
