import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { WidgetFormBase, WidgetZone } from '../../../core/core-interface';
import { ContainerX2Form, WidgetFormGroup, ContainerWidgetId } from '../../../core/widget.common';


@Component({
  selector: 'container2-component',
  templateUrl: './container2.html'
})
export class Container2Component extends ComponentBase implements OnInit, AfterViewInit {
 
  public model: ContainerX2Form = new ContainerX2Form();
  public instances: WidgetFormBase[] = new Array<WidgetFormBase>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Create Container(X2) Widget";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('container2-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Create Widget- Container(X2): Delta Admin")
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

  public addChild1() {
    this.model.settings.column1.push(new ContainerWidgetId())
  }

  public removeChild1(id: number) {
    let index = this.model.settings.column1.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.column1.splice(index, 1)
    }
  }

  public addChild2() {
    this.model.settings.column2.push(new ContainerWidgetId())
  }

  public removeChild2(id: number) {
    let index = this.model.settings.column2.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.column2.splice(index, 1)
    }
  }

  public addChild3() {
    this.model.settings.column3.push(new ContainerWidgetId())
  }

  public removeChild3(id: number) {
    let index = this.model.settings.column3.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.column3.splice(index, 1)
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

  public addChild5() {
    this.model.settings.column5.push(new ContainerWidgetId())
  }

  public removeChild5(id: number) {
    let index = this.model.settings.column5.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.column5.splice(index, 1)
    }
  }

  public addChild6() {
    this.model.settings.column6.push(new ContainerWidgetId())
  }

  public removeChild6(id: number) {
    let index = this.model.settings.column6.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.column6.splice(index, 1)
    }
  }

  private createWidget() {
    return this.httpContext.create<any>(this.endpoints.coreWidgetEndpoints.containerX2Create, this.model)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.endpoints.coreWidgetEndpoints.containerX2Update, this.model)
  }

  private getWidgetinstance(id: number) {
    this.httpContext.read<any>(this.endpoints.coreWidgetEndpoints.containerX2Read + id).subscribe((x) => {
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
