import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { WidgetFormBase, WidgetZone } from '../../../core/core-interface';
import { WidgetFormGroup } from '../../../core/widget.common';

class FlexSettings {
  pageId: number;
}
class FlexWidgetForm extends WidgetFormBase {
  public htmlContent: string;
  settings: FlexSettings = new FlexSettings();
}

@Component({
  selector: 'flex-widget',
  templateUrl: './flex-widget.html'
})
export class FlexWidgetComponent extends ComponentBase implements OnInit, AfterViewInit {
 
  public model: FlexWidgetForm = new FlexWidgetForm();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public flexFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Flex Widget";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('flex-widget')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Flex Widget: Delta Admin")
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
    if (this.flexFormGroup.valid) {
      this.inAsyncMode = true
      this.validationErrors = []

      let result: Observable<any>

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

  public appendFlex(data: any) {
    if (this.model.htmlContent == "<br />" || this.model.htmlContent == "<br/>"
      || this.model.htmlContent == "undefined" || this.model.htmlContent == undefined
      || this.model.htmlContent == "undefined<br/>" || this.model.htmlContent == "undefined <br/>") {
      this.model.htmlContent = ""
    }

    this.model.htmlContent = this.model.htmlContent + data.content
  }

  private createWidget() {
    return this.httpContext.create<any>(this.endpoints.flexEndpoints.create, this.model)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.endpoints.flexEndpoints.update, this.model)
  }

  private getWidgetinstance(id: number) {
    this.httpContext.read<any>(this.endpoints.flexEndpoints.read + id).subscribe((x) => {
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
