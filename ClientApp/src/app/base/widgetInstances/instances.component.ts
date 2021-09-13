import { Component, AfterViewInit, OnInit } from '@angular/core';
import { WidgetInstance, NotificationType, DialogOptions, DialogResult } from '../../core/core-interface';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';


@Component({
  selector: 'widget-instance',
  templateUrl: './instances.component.html'
})
export class WidgetInstanceComponent extends ComponentBase implements OnInit, AfterViewInit {
 
  public title: string = "Widget Instances";
  public instances: WidgetInstance[] = new Array<WidgetInstance>();

  public constructor(private endpoints: EndpointMetadata) {
    super('widget-instance')
    this.updatePageTitle("Widget Instances: Delta Admin")
  }

  ngOnInit() {
    this.getInstances();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }

  public deleteInstance(id: number) {
    this.showModalDialog("Delete Widget?", "are you sure you want to delete this widget?", NotificationType.warning, DialogOptions.YesNo)
      .then((result) => {
        if (result == (DialogResult.Yes | DialogResult.Ok)) {
          this.inAsyncMode = true
          this.httpContext.delete<any>(this.endpoints.widgetInstanceEndpoints.delete + id).subscribe((x) => {
            this.toastNotification("", "Widget deleted", NotificationType.success)
            this.getInstances();
          }, (error) => {
              this.inAsyncMode = false
              this.handleError(error)
          });
        }
      }).catch(() => {

      })
  }

  public copyWidgetCode(id: number) {
    let code = `@await Component.InvokeAsync("CoreWidgetInstance", new { widgetInstanceId = ${id}L })`

    const element = document.createElement('textarea');
    element.style.display = 'hidden';
    element.value = code;
    document.body.appendChild(element);
    element.focus();
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  }

  private getInstances() {
    this.httpContext.read<any>(this.endpoints.widgetInstanceEndpoints.list).subscribe((x) => {
      this.instances = x
      this.inAsyncMode = false
    }, (error) => {
        this.inAsyncMode = false
      this.handleError(error)
    });
  }

  public showInPreview(id: number) {
    this.inAsyncMode = true
    this.httpContext.read<any>(this.endpoints.widgetInstanceEndpoints.showPreview + id).subscribe((x) => {
      this.inAsyncMode = false

      let index = this.instances.findIndex(x => x.id == id)
      if (index > -1) {
        this.instances[index].showInPreview = !this.instances[index].showInPreview
      }
    }, (error) => {
        this.inAsyncMode = false
        this.handleError(error)
    });
  }
}
