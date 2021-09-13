import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { WidgetFormBase, WidgetZone } from '../../../core/core-interface';
import { Container8Form, WidgetFormGroup, ContainerWidgetId } from '../../../core/widget.common';


@Component({
  selector: 'container48-component',
  templateUrl: './container48.html'
})
export class Container48Component extends ComponentBase implements OnInit, AfterViewInit {
 
  public model: Container8Form = new Container8Form();
  public instances: WidgetFormBase[] = new Array<WidgetFormBase>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Container 48 ";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('container48-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Container 48: Delta Admin")
  }

  ngOnInit() {
    this.inAsyncMode = true
    if (this.model && this.model.id) {
      this.getWidgetinstance(this.model.id)
    }
    this.getWidgetZones();
    this.getWidgetInstances();
  }

  ngAfterViewInit() {
    this.afterComponentInit();
  }

  public submit() {
    this.isSubmitting = true;
    if (this.widgetFormGroup.valid) {
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

  public addChild4() {
    this.model.settings.column4.push(new ContainerWidgetId())
  }

  public removeChild4(id: number) {
    let index = this.model.settings.column4.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.column4.splice(index, 1)
    }
  }

  public addChild8() {
    this.model.settings.column8.push(new ContainerWidgetId())
  }

  public removeChild8(id: number) {
    let index = this.model.settings.column8.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.column8.splice(index, 1)
    }
  }

  private createWidget() {
    return this.httpContext.create<any>(this.endpoints.coreWidgetEndpoints.container48Create, this.model)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.endpoints.coreWidgetEndpoints.container48Update, this.model)
  }

  private getWidgetinstance(id: number) {
    this.httpContext.read<any>(this.endpoints.coreWidgetEndpoints.container48Read + id).subscribe((x) => {
      this.model = x
      this.inAsyncMode = false
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

  private getWidgetInstances() {
    this.httpContext.read<any>(this.endpoints.widgetInstanceEndpoints.list).subscribe(x => {
      this.instances = x
      if (this.isEditMode) {
        let indexOfMe = this.instances.findIndex(x => x.id == this.model.id)
        this.instances.splice(indexOfMe, 1)
      } else {
        this.inAsyncMode = false
      }
    }, (fail) => {
        this.inAsyncMode = false
      this.handleError(fail, true)
    });
  }

  private getWidgetZones() {
    this.httpContext.read<any>(this.endpoints.widgetZoneEndpoints.list).subscribe((x) => {
      this.widgetZones = x
    }, (fail) => {
      this.handleError(fail, true)
    });
  }
}
