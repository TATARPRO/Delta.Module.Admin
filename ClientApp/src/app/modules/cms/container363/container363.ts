import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../core/endpointMeta';
import { WidgetFormBase, WidgetZone } from '../../../core/core-interface';
import { Container363Form, WidgetFormGroup, ContainerWidgetId } from '../../../core/widget.common';


@Component({
  selector: 'container363-component',
  templateUrl: './container363.html'
})
export class Container363Component extends ComponentBase implements OnInit, AfterViewInit {
 
  public model: Container363Form = new Container363Form();
  public instances: WidgetFormBase[] = new Array<WidgetFormBase>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Container 363";
  public isEditMode = false;
  public isSubmitting = false;

  public constructor(activatedRoute: ActivatedRoute, private router: Router, private endpoints: EndpointMetadata) {
    super('container363-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Create Widget- Container(3x6x3): Delta Admin")
  }

  ngOnInit() {
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

  public addLeft() {
    this.model.settings.leftColumn.push(new ContainerWidgetId())
  }

  public removeLeft(id: number) {
    let index = this.model.settings.leftColumn.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.leftColumn.splice(index, 1)
    }
  }

  public addMiddle() {
    this.model.settings.middleColumn.push(new ContainerWidgetId())
  }

  public removeMiddle(id: number) {
    let index = this.model.settings.middleColumn.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.middleColumn.splice(index, 1)
    }
  }

  public addRight() {
    this.model.settings.rightColumn.push(new ContainerWidgetId())
  }

  public removeRight(id: number) {
    let index = this.model.settings.rightColumn.findIndex(x => x.widgetInstanceId == id)
    if (index > -1) {
      this.model.settings.rightColumn.splice(index, 1)
    }
  }

  private createWidget() {
    return this.httpContext.create<any>(this.endpoints.coreWidgetEndpoints.container363Create, this.model)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.endpoints.coreWidgetEndpoints.container363Update, this.model)
  }

  private getWidgetinstance(id: number) {
    this.httpContext.read<any>(this.endpoints.coreWidgetEndpoints.container363Read + id).subscribe((x) => {
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
