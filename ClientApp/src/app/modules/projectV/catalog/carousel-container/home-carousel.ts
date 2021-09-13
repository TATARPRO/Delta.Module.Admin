import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import ComponentBase from '../../../../core/componentBase';
import { Observable } from 'rxjs';
import { EndpointMetadata } from '../../../../core/endpointMeta';
import { WidgetFormBase, WidgetZone } from '../../../../core/core-interface';
import { WidgetFormGroup } from '../../../../core/widget.common';

class HomeCarouselForm extends WidgetFormBase {
  settings: HomeCarouselSettings = new HomeCarouselSettings();
}
class HomeCarouselSettings {
  categoryId: number;
  carouselId: number;
  flexId: number;
}

@Component({
  selector: 'homecarousel-component',
  templateUrl: './home-carousel.html'
})
export class HomeCarouselComponent extends ComponentBase implements OnInit, AfterViewInit {
 
  public model: HomeCarouselForm = new HomeCarouselForm();
  public instances: WidgetFormBase[] = new Array<WidgetFormBase>();
  public widgetZones: WidgetZone[] = new Array<WidgetZone>();
  public widgetFormGroup: WidgetFormGroup = new WidgetFormGroup();
  public title: string = "Carousel Container";
  public isEditMode = false;
  public isSubmitting = false;
  apiEndpoints = {
    read: "/projectv/carousel-container1/read/",
    update: "/projectv/carousel-container1/update/",
    create: "/projectv/carousel-container1/create"
  }
  public constructor(activatedRoute: ActivatedRoute, private router: Router,
    private endpoints: EndpointMetadata) {
    super('homecarousel-component')
    if (activatedRoute.snapshot.params["id"]) {
      this.isEditMode = true;
      this.model.id = activatedRoute.snapshot.params["id"]
    }
    this.updatePageTitle("Carousel Widget: Delta Admin")
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

  
  private createWidget() {
    return this.httpContext.create<any>(this.apiEndpoints.create, this.model)
  }

  private updateWidget() {
    return this.httpContext.update<any>(this.apiEndpoints.update, this.model)
  }

  private getWidgetinstance(id: number) {
    this.httpContext.read<any>(this.apiEndpoints.read + id).subscribe((x) => {
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
