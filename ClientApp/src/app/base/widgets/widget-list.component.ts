import { Component, AfterViewInit, OnInit } from '@angular/core';
import { WidgetGroup } from '../../core/core-interface';
import ComponentBase from '../../core/componentBase';
import { EndpointMetadata } from '../../core/endpointMeta';


@Component({
  selector: 'widget-list-component',
  templateUrl: './widget-list.component.html'
})
export class WidgetListComponent extends ComponentBase implements OnInit, AfterViewInit {
 
  public title: string = "Widgets";
  public widgets: WidgetGroup[] = new Array<WidgetGroup>();

  public constructor(private endpoints: EndpointMetadata) {
    super('widget-list-component')
    this.updatePageTitle(this.title)
  }

  ngOnInit() {
    this.inAsyncMode = true
    this.getWidgets();
  }

  ngAfterViewInit() {
    this.afterComponentInit()
  }
  private getWidgets() {
    this.httpContext.read<any>(this.endpoints.widgetEndpoints.list).subscribe(x => {
      this.widgets = x
      this.inAsyncMode = false
    }, fail => { this.inAsyncMode = false; this.handleError(fail) });
  }
}
