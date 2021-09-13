import { Component, AfterViewInit, OnInit } from '@angular/core';
import ComponentBase from '../../../core/componentBase';
import { ProductImportForm } from '../vendor/vendor-models';
import { NotificationType } from '../../../core/core-interface';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TaxEndpoints } from '../tax/taxEndpoints';
import { CustomFormControl, CustomFormGroup } from '../../../core/formControlExtension';
import { Validators } from '@angular/forms';

class YiwugoProductImportForm extends ProductImportForm {
  industryNumber: number = 1;
  industryName: string;
  description: string;
  floorNumber: number
  taxClassId: number
}
class YiwuImportFormGroup extends CustomFormGroup {
  constructor() {
    super({
      pageNumber: new CustomFormControl("Page Number", "pageNumber", "", "number", "a", null),
      pageSize: new CustomFormControl("Page Size", "pageSize", "", "number", "a", null),
      floorNumber: new CustomFormControl("Floor Number", "floorNumber", "", "number", "a", Validators.compose([
        Validators.required])),
      industryNumber: new CustomFormControl("Industry Code", "industryNumber", "", "number", "a", Validators.compose([
        Validators.required])),
      industryName: new CustomFormControl("Industry Name", "industryName", "", "text", "a", null),
      description: new CustomFormControl("Description", "description", "", "text", "a", null),
      taxClassId: new CustomFormControl("Tax Class", "taxClassId", "", "select", "a", Validators.compose([
        Validators.required]))
    })
  }
}
@Component({
  selector: 'yiwugo-form-component',
  templateUrl: './yiwugo-form.component.html'
})
export class YiwugoFormComponent extends ComponentBase implements OnInit, AfterViewInit {

  public model: YiwugoProductImportForm = new YiwugoProductImportForm();
  public yiwuImportFormGroup = new YiwuImportFormGroup();
  public taxClasses = []
  public title: string = "Yiwugo Product Import";
  public isSubmitting = false;
  public marketCode = 0;
  public uploadPercent = 0;
  public isDownloading = false
  private form = new FormData();
  private apiEndpoints = {
    import: "/projectv/yiwugo/import/",
    fetch: "/projectv/yiwugo/fetch-products/",
    getIndustries: "/projectv/yiwugo/get-industries/"
  }

  public constructor(private taxEndpoints: TaxEndpoints) {
    super('yiwugo-form-component')
  }

  ngOnInit() {
    this.getTaxClasses()
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
      this.isSubmitting = true;
    if (this.yiwuImportFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      this.httpContext.raw<Blob>('POST', this.apiEndpoints.fetch, this.model, {
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
          a.download = `yiwu.${this.model.industryNumber}.${this.model.pageSize}.${this.model.pageNumber}.csv`;
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
          document.body.removeChild(a);

          this.isDownloading = false
          this.isSubmitting = false;
          this.inAsyncMode = false
        }
      }, (fail) => {
          this.inAsyncMode = false
        this.handleError(fail)
      });
    }
  }

  private getTaxClasses() {
    this.httpContext.read<any>(this.taxEndpoints.taxClass.list).subscribe((x) => {
      this.taxClasses = x
      this.inAsyncMode = false
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public getIndustries() {
    this.validationErrors = []

    this.httpContext.raw<Blob>('GET', this.apiEndpoints.getIndustries + this.marketCode, {
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
        a.download = `yiwu.Industries.${this.marketCode}.csv`;
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      }
    }, (fail) => {
      this.isDownloading = false
        this.inAsyncMode = false
      this.handleError(fail)
    });
  }

  public fileChanged(fileList: FileList) {
    if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
      this.form = new FormData();
      this.form.append("productList", fileList[0], "productList")
    }
  }

  public importProducts() {
    this.inAsyncMode = true
    this.httpContext.raw('POST', this.apiEndpoints.import, this.form, {
      reportProgress: true,
    }).subscribe((x) => {
      if (x.type != HttpEventType.Response) {
        this.isDownloading = true

      } else if (x instanceof HttpResponse) {

        this.isDownloading = false
        this.inAsyncMode = false
        this.toastNotification("Upload Successfull", "Products imported successfully", NotificationType.success)
      }
    }, (error) => {
      this.isDownloading = false
        this.inAsyncMode = false
      this.handleError(error)
    })
  }
}
