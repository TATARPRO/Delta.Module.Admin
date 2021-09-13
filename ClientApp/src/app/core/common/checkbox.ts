import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, Renderer2, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "checkbox",
  template: `
            <label class="form-check-label" *ngIf="!formGroup && ngModel">
                  <input type="checkbox" checked="{{checked}}" [ngModelOptions]="{standalone: true}" [(ngModel)]="ngModel" class="form-check-input" />
                  {{label}}
                  <i class="input-helper"></i>
             </label>
            <label class="form-check-label" *ngIf="!formGroup && !ngModel">
                  <input type="checkbox" [checked]="checked" (click)="checkClicked()" class="form-check-input" />
                  {{label}}
                  <i class="input-helper"></i>
             </label>
            <label class="form-check-label" *ngIf="formGroup && ngModel" [formGroup]="formGroup">
                  <input type="checkbox" formControlName="{{formControlName}}" [(ngModel)]="ngModel" class="form-check-input" />
                  {{label}}
                  <i class="input-helper"></i>
             </label>
            <label class="form-check-label" *ngIf="formGroup && !ngModel" [formGroup]="formGroup">
                  <input type="checkbox" checked="checked" formControlName="{{formControlName}}" class="form-check-input" />
                  {{label}}
                  <i class="input-helper"></i>
             </label>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DeltaCheckboxComponent),
    multi: true
  }]
})
export class DeltaCheckboxComponent implements ControlValueAccessor {
  boxChecked: boolean

  @Input()
  formGroup

  @Input()
  formControlName

  @Input()
  label

  @Input()
  checked: boolean

  @Input()
  set ngModel(val: boolean) {
    this.boxChecked = val
    this.checked = this.boxChecked
    this.ngModelChange.emit(this.boxChecked)
  }

  get ngModel() {
    return this.boxChecked
  }

  @Output()
  ngModelChange = new EventEmitter<boolean>()

  @Output()
  click = new EventEmitter<boolean>()

  checkClicked() {
    this.boxChecked = !this.boxChecked
    //this.checked = this.boxChecked
    this.click.emit(this.boxChecked)
  }

  onChange = (_: any) => {}

  writeValue(val: any): void {
    this.boxChecked = val
    this.checked = this.boxChecked
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched = (_: any) => { }

  constructor() {
    this.boxChecked = this.checked
  }
}


@Component({
  selector: "file-upload",
  template: `<div class="form-group" [ngClass]="ngClass">
                <label>{{label}}</label>
                <input type="file" #fileInput *ngIf="!multiple" (change)="fChange($event)" class="file-upload-default">
                <input type="file" #fileInput *ngIf="multiple" multiple="{{multiple}}" (change)="fChange($event)" class="file-upload-default">
                <div class="input-group col-xs-12">
                  <input type="text" #fileNames class="form-control file-upload-info" disabled placeholder="{{placeholder}}">
                  <span class="input-group-append">
                    <button class="file-upload-browse btn btn-primary" type="button">Select</button>
                  </span>
                </div>
              </div>`
})
export class DeltaFileUploadComponent {
  @Input()
  multiple: boolean

  @Input()
  placeholder: string

  @Input()
  label: string

  @Input()
  ngClass: string

  @Output()
  change = new EventEmitter<FileList>()

  @ViewChild('fileInput')
  fileInput: ElementRef

  @ViewChild('fileNames')
  fileNames: ElementRef

  @HostListener('click')
  openFileDialog() {
    this.fileInput.nativeElement.click()
  }

  constructor(private renderer: Renderer2) {}

  fChange($e) {
    let fileList = $e.target.files
    this.change.emit(fileList)
    let fileNames = ''

    if (this.multiple) {
      for (let file in fileList) {
        if (fileList[file] instanceof File)
          fileNames = fileNames.concat(fileList[file].name, ' , ')
      }
    } else {
      fileNames = fileList[0].name
    }
    
    this.renderer.setProperty(this.fileNames.nativeElement, 'value', fileNames)
  }
}
