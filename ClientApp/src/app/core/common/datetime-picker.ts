import { AfterViewInit, Component, EventEmitter, forwardRef, Input, Output, Directive, ElementRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

declare var jQuery
@Component({
  selector: "datetime-picker",
  template: `
            <input type="text" class="{{css}}" [ngClass]="type" [(ngModel)]="ngModel" placeholder="{{placeholder}}">

`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimePickerComponent),
    multi: true
  }]
})
export class DateTimePickerComponent implements ControlValueAccessor, AfterViewInit {
  
  @Input()
  placeholder: string

  @Input()
  css: string

  @Input()
  type: string

  @Input()
  formGroup: any

  @Input()
  formControlName: string

  @Input()
  format: string

  private date: Date
  
  @Input()
  set ngModel(val: Date) {
    this.date = new Date(val)
    this.ngModelChange.emit(this.date)
  }

  get ngModel() {
    return this.date
  }

  @Output()
  ngModelChange = new EventEmitter<Date>()

  onChange = (_: any) => {}

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched = (_: any) => { }

  dateChanged($event) {
    this.ngModelChange.emit($event.target.value)
  }

  ngAfterViewInit() {
    let op: any = {
      format: this.format,
      clearButton: true,
    }

    if (this.type == "datetimepicker" || this.type == "datepicker") op.weekStart = 1;
    if (this.type == "datepicker") op.time = false;
    if (this.type == "timepicker") op.date = false;

    jQuery("." + this.type).bootstrapMaterialDatePicker(op)

    //let elId = Math.floor(Math.random() * 100000)
    //this.element.nativeElement.id = elId
    //jQuery(`#${elId}`).bootstrapMaterialDatePicker(op)
  }

  setDate(date: any) {
    this.date = new Date(date)
  }

  writeValue(val: any): void {
    this.date = val
  }
}



@Directive({
  selector: '[datetimepicker]'
})
export class DateTimePickerDirective implements AfterViewInit {

  @Input()
  format: string

  @Input()
  datetimepicker: string

  @Input()
  time: boolean = false

  @Input()
  date: boolean = false

  constructor(private element: ElementRef) {
    
  }
  ngAfterViewInit() {
    let op: any = {
      format: this.format,
      clearButton: true,
    }

    if (this.datetimepicker == "datetimepicker" || this.datetimepicker == "datepicker") op.weekStart = 1;
    if (this.datetimepicker == "datepicker") op.time = this.time;
    if (this.datetimepicker == "timepicker") op.date = this.date;

    let elId = Math.floor(Math.random() * 100000)
    this.element.nativeElement.id = elId
    jQuery(`#${elId}`).bootstrapMaterialDatePicker(op)
  }
}
