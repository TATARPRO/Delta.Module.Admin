import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { WidgetFormBase, WidgetZone } from '../../../core/core-interface';
import { WidgetFormGroup } from '../../../core/widget.common';

class CarouselWidgetItemForm {
  image: string;
  imageUrl: string;
  caption: string;
  targetUrl: string = "/";
  previewUrl: any;
  uploadImage: File
}
class CarouselWidgetForm extends WidgetFormBase {
  items: CarouselWidgetItemForm[] = new Array<CarouselWidgetItemForm>();
}

@Component({
  selector: 'carousel-widget',
  templateUrl: './carousel-widget.html'
})
export class CarouselWidgetComponent extends ComponentBase implements OnInit, AfterViewInit {
 
  public model: CarouselWidgetForm = new CarouselWidgetForm();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public carouselFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Create carousel Widget";
  public isEditMode = false;
  public isSubmitting = false;
  private form = new FormData();

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('carousel-widget')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Create carousel Widget: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    if (this.model && this.model.id) {
      this.getWidgetinstance(this.model.id)
    }
    this.getWidgetZones();
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.carouselFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>
      this.createFormData();
      if (!this.isEditMode)
        result = this.createWidget()
      else 
        result = this.updateWidget()
      
      result.subscribe(() => {
        this.router.navigateByUrl("/widget-instances")
      }, (fail) => {
          this.inAsyncMode = false
          this.handleError(fail)
      });
    }
  }

  public fileChanged(fileList: FileList, index) {
    if (fileList.length > 0) {
      let file: File = fileList[0];
      if (file.type.match(/image\/*/) == null) {
        this.model.items[index].uploadImage = undefined
        return;
      }

      this.model.items[index].uploadImage = file
      this.getFilePreview(file, index)
    }
  }

  public getFilePreview(file: File, index) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => { this.model.items[index].previewUrl = reader.result }
  }

  public addItem() {
    this.model.items.push(new CarouselWidgetItemForm())
  }

  public removeItem(item: CarouselWidgetItemForm) {
    let index = this.model.items.indexOf(item)
    if (index > -1) {
      this.model.items.splice(index, 1)
    }
  }

  private createFormData() {
    for (let key in this.model) {
      if (this.model[key] instanceof Object) {
        this.model[key].forEach((item, index) => {
          if (item) {
            for (let innerKey in item) {
              if (innerKey) {
                if (item[innerKey] != undefined) {
                  this.form.append(`items[${index}][${innerKey}]`, item[innerKey]);
                }
              }
            }
          }
        })
      } else {
        if (this.model[key] != undefined) {
          let value = this.model[key];
          this.form.append(key, value);
        }
      }
    }
  }

  private createWidget() {
    return this.httpContext.create<any>(this.endpoints.carouselWidgetEndpoints.create, this.form)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.endpoints.carouselWidgetEndpoints.update + this.model.id, this.form)
  }

  private getWidgetinstance(id: number) {
    this.httpContext.read<any>(this.endpoints.carouselWidgetEndpoints.read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

  private getWidgetZones() {
    this.httpContext.read<any>(this.endpoints.widgetZoneEndpoints.list).subscribe((x) => {
      this.widgetZones = x
      if (!this.isEditMode) {
        this.inAsyncMode = false
      }
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }
}
